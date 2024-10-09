import React from "react";

const Nutzungsbedingungen = () => {
  return (
    <div className="bg-cyan-50 min-h-screen w-full p-2 md:p-8 break-words hyphens-manual">
      <h1 className="text-2xl xxs:text-3xl md:text-4xl font-bold text-cyan-800 mb-8">
        Nutzungsbedingungen
      </h1>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-cyan-700 mb-4 flex items-center">
            1. Geltungsbereich und Zustimmung
          </h2>
          <p className="text-cyan-800 mb-4">
            Diese Nutzungsbedingungen gelten für die Nutzung der Website
            blw-gourmet.de. Mit der Nutzung unserer Website erklären Sie sich
            mit diesen Bedingungen einverstanden. Falls Sie mit diesen
            Bedingungen nicht einverstanden sind, bitten wir Sie, unsere Website
            nicht zu nutzen.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-cyan-700 mb-4 flex items-center">
            2. Nutzerkonto und Inhalte
          </h2>
          <p className="text-cyan-800 mb-4">
            Um Rezepte hochzuladen oder zu kommentieren, müssen Sie sich
            registrieren. Sie sind für die Geheimhaltung Ihres Passworts
            verantwortlich. Alle Aktivitäten, die unter Ihrem Konto stattfinden,
            liegen in Ihrer Verantwortung, mit Ausnahme von Änderungen die unser
            Team vorgenommen hat.
          </p>
          <p className="text-cyan-800 mb-4">
            Beim Hochladen von Rezepten oder anderen Inhalten:
          </p>
          <ul className="list-disc list-inside text-cyan-800 mb-4">
            <li>
              Versichern Sie, dass Sie das Recht haben, diese Inhalte zu teilen.
            </li>
            <li>
              Erteilen Sie uns eine weltweite, nicht-exklusive, gebührenfreie
              Lizenz zur Nutzung, Vervielfältigung und Anzeige dieser Inhalte
              auf unserer Website.
            </li>
            <li>
              Stimmen Sie zu, dass wir Ihre Inhalte (Rezepte), die gegen diese
              Nutzungsbedingungen oder geltendes Recht verstoßen, entfernen oder
              im Falle von Rechtschreib- oder Formatierungs sowie anderen
              kleinen Fehlern bearbeiten dürfen.
            </li>
            <li>
              Stimmen Sie zu, keine beleidigenden, obszönen, bedrohlichen oder
              anderweitig unangemessenen Inhalte hochzuladen.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-cyan-700 mb-4 flex items-center">
            3. Werbung und Partnerlinks
          </h2>
          <p className="text-cyan-800 mb-4">
            Unsere Website kann Werbeanzeigen und Partnerlinks enthalten. Wir
            übernehmen keine Verantwortung für die Inhalte oder Produkte dieser
            Werbetreibenden oder Partner. Jegliche Transaktionen mit diesen
            Dritten erfolgen auf Ihr eigenes Risiko.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-cyan-700 mb-4 flex items-center">
            4. Datenschutz
          </h2>
          <p className="text-cyan-800 mb-4">
            Unsere Datenschutzrichtlinien erklären, wie wir Ihre persönlichen
            Daten sammeln und verwenden. Durch die Nutzung unserer Website
            stimmen Sie unseren Datenschutzrichtlinien zu.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-cyan-700 mb-4 flex items-center">
            5. Geistiges Eigentum
          </h2>
          <p className="text-cyan-800 mb-4">
            Alle Inhalte auf dieser Website, die nicht von Nutzern hochgeladen
            wurden, einschließlich Texte, Grafiken, Logos und Softwarecode, sind
            unser Eigentum oder das Eigentum unserer Lizenzgeber und durch
            Urheberrechte geschützt.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-cyan-700 mb-4 flex items-center">
            6. Haftungsausschluss
          </h2>
          <p className="text-cyan-800 mb-4">
            Wir bemühen uns, korrekte und aktuelle Informationen
            bereitzustellen, können jedoch keine Garantie für die Richtigkeit,
            Vollständigkeit oder Aktualität der Inhalte geben. Die Nutzung der
            Website und der bereitgestellten Informationen erfolgt auf eigenes
            Risiko.
          </p>
          <p className="text-cyan-800 mb-4">
            Insbesondere bei Rezepten und Ernährungstipps empfehlen wir, im
            Zweifelsfall einen Arzt oder Ernährungsberater zu konsultieren,
            besonders wenn Sie Allergien oder andere gesundheitliche
            Einschränkungen haben.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-cyan-700 mb-4 flex items-center">
            7. Änderungen der Nutzungsbedingungen
          </h2>
          <p className="text-cyan-800 mb-4">
            Wir behalten uns das Recht vor, diese Nutzungsbedingungen jederzeit
            zu ändern. Wesentliche Änderungen werden wir Ihnen mitteilen. Die
            fortgesetzte Nutzung der Website nach solchen Änderungen gilt als
            Zustimmung zu den neuen Bedingungen.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-cyan-700 mb-4 flex items-center">
            8. Kündigung
          </h2>
          <p className="text-cyan-800 mb-4">
            Wir behalten uns das Recht vor, Ihr Konto zu sperren oder zu löschen
            und Ihren Zugang zur Website zu beenden, wenn Sie gegen diese
            Nutzungsbedingungen verstoßen oder aus anderen triftigen Gründen.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Nutzungsbedingungen;
