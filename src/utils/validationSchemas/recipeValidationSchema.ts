import * as Yup from "yup";
import { validUnits } from "@/utils/validUnits";

const unitInvalidText = (unit: string) =>
  `Achtung: "${unit}" ist keine gültige Einheit. Bitte notiere die Mengenangabe in der Zutatenbezeichnung (z. B. „Öl zum Anbraten“ oder „Gewürze nach Wahl“). Lasse die Einheit „Stück“ vollständig aus (z.B. „1 Orange“, „3 Äpfel“). Falls es sich um Stücke (also Bruchteile einer Zutat) handelt, gebe bitte z. B. „3 Apfelstücke“ oder „250g Apfelstücke“. an. Gültige Einheiten sind: ${validUnits.join(", ")}`;

export const recipeValidationSchema = Yup.object({
  name: Yup.string()
    .required("Name ist erforderlich")
    .max(100, "Name darf nicht länger als 100 Zeichen sein"),
  description: Yup.string()
    .required("Beschreibung ist erforderlich")
    .max(2000, "Beschreibung darf nicht länger als 2000 Zeichen sein"),
  labels: Yup.array()
    .of(Yup.string().max(30, "Label darf nicht länger 30 Zeichen lang sein"))
    .max(7, "Maximal 7 Labels erlaubt"),
  dining_times: Yup.array()
    .of(Yup.string())
    .test(
      "dining-times",
      "Bitte wähle mindestens eine Mahlzeit aus, für die das Rezept geeignet ist",
      function (value) {
        if (value && value.length > 0 && value.some((time) => time !== "")) {
          return true;
        }
        return false;
      }
    ),
  preparation_time: Yup.number()
    .min(1, "Bitte gebe eine Zubereitungszeit von mindestens einer Minute an")
    .max(2880, "Die Zubereitungszeit darf nicht mehr als 48 Stunden betragen")
    .nullable(),
  rest_time: Yup.number()
    .min(0, "Die Ruhezeit darf nicht negativ sein")
    .max(2880, "Die Ruhezeit darf nicht mehr als 48 Stunden betragen")
    .nullable(),
  ingredients: Yup.array()
    .of(
      Yup.object().shape({
        ingredient: Yup.string().when(
          ["amount", "unit"],
          ([amount, unit], schema) => {
            if (
              (amount !== undefined &&
                amount !== null &&
                amount !== "" &&
                amount !== 0) ||
              (unit !== undefined && unit !== null && unit !== "")
            ) {
              return schema
                .required(
                  "Zutatenbezeichnung darf nicht leer sein, sofern Menge oder Einheit angegeben ist"
                )
                .max(100, "Zutat darf nicht länger als 100 Zeichen sein");
            }
            return schema;
          }
        ),
        amount: Yup.number().when(["unit"], ([unit], schema) => {
          if (unit !== undefined && unit !== null && unit !== "") {
            return schema
              .required("Die Menge ist erforderlich")
              .moreThan(0, "Die Menge muss größer als 0 sein")
              .max(10000, "Die Menge darf nicht mehr als 10000 sein");
          }
          return schema
            .nullable()
            .min(0, "Die Menge darf nicht negativ sein")
            .max(10000, "Die Menge darf nicht mehr als 10000 sein");
        }),
        unit: Yup.string()
          .nullable()
          .test("is-valid-unit", function (value) {
            if (value && !validUnits.includes(value)) {
              return this.createError({
                message: unitInvalidText(value),
              });
            }
            return true;
          }),
      })
    )
    .test(
      "ingredients",
      "Bitte füge mindestens eine Zutat hinzu",
      function (value) {
        if (
          value &&
          value.length > 0 &&
          value.some(
            (ingredient) =>
              ingredient.ingredient?.trim() ||
              (ingredient.amount && ingredient.amount > 0) ||
              ingredient.unit?.trim()
          )
        ) {
          return true;
        }
        return false;
      }
    ),
  tools: Yup.array().of(
    Yup.string().max(100, "Utensil darf nicht länger als 100 Zeichen sein")
  ),
  instructions: Yup.array()
    .of(
      Yup.object()
        .shape({
          name: Yup.string().max(
            100,
            "Bezeichnung des Arbeitsschrittes darf nicht länger als 100 Zeichen sein"
          ),
          instruction: Yup.string().max(
            2000,
            "Anweisung darf nicht länger als 2000 Zeichen sein"
          ),
          ingredients: Yup.array().of(
            Yup.object().shape({
              ingredient: Yup.string().when(
                ["amount", "unit"],
                ([amount, unit], schema) => {
                  if (
                    (amount !== undefined &&
                      amount !== null &&
                      amount !== "" &&
                      amount !== 0) ||
                    (unit !== undefined && unit !== null && unit !== "")
                  ) {
                    return schema
                      .required(
                        "Zutatenbezeichnung darf nicht leer sein, sofern Menge oder Einheit angegeben ist"
                      )
                      .max(100, "Zutat darf nicht länger als 100 Zeichen sein");
                  }
                  return schema;
                }
              ),
              amount: Yup.number().when(["unit"], ([unit], schema) => {
                if (unit !== undefined && unit !== null && unit !== "") {
                  return schema
                    .required(
                      "Die Menge ist erforderlich, sofern eine Einheit angegeben ist"
                    )
                    .moreThan(
                      0,
                      "Die Menge muss größer als 0 sein, sofern eine Einheit angegeben ist"
                    )
                    .max(10000, "Die Menge darf nicht mehr als 10000 sein");
                }
                return schema
                  .nullable()
                  .min(0, "Die Menge darf nicht negativ sein")
                  .max(10000, "Die Menge darf nicht mehr als 10000 sein");
              }),
              unit: Yup.string()
                .nullable()
                .test("is-valid-unit", function (value) {
                  if (value && !validUnits.includes(value)) {
                    return this.createError({
                      message: unitInvalidText(value),
                    });
                  }
                  return true;
                }),
            })
          ),
          tools: Yup.array().of(
            Yup.string().max(
              100,
              "Utensil darf nicht länger als 100 Zeichen sein"
            )
          ),
        })
        .test(
          "name-or-instruction",
          "Es muss mindestens eine Bezeichnung oder Anweisungen für diesen Arbeitsschritt angegeben werden",
          function (value) {
            const validIngredients = value.ingredients?.some(
              (ingredient) =>
                ingredient.ingredient?.trim() ||
                (ingredient.amount && ingredient.amount > 0) ||
                ingredient.unit?.trim()
            );
            const validTools = value.tools?.some((tool) => (tool ?? "").trim());
            const hasIngredientsOrTools = validIngredients || validTools;
            const hasNameOrInstruction =
              value.name?.trim() || value.instruction?.trim();
            if (hasIngredientsOrTools) {
              return !!hasNameOrInstruction;
            }
            return true;
          }
        )
    )
    .test(
      "instructions",
      "Bitte füge mindestens eine Anweisung hinzu",
      function (value) {
        const validInstructions = value?.some(
          (instruction) =>
            instruction.name?.trim() || instruction.instruction?.trim()
        );
        if (validInstructions) {
          return true;
        }
        return false;
      }
    ),
});
