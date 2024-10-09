import React from "react";
import {
  FaBaby,
  FaCarrot,
  FaAppleAlt,
  FaBook,
  FaHeartbeat,
  FaSmile,
  FaUsers,
} from "react-icons/fa";
import "@/styles/gradient-animation.css";

const WhatIsBlw = () => {
  return (
    <div className="max-w-5xl lg:max-w-7xl min-h-screen px-8">
      <h1 className="text-center text-3xl xxs:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-cyan-950 font-bold mb-8">
        Was ist Baby-led Weaning (BLW)?
      </h1>

      <div className="rounded-lg p-6 mb-8">
        <p className="bg-cyan-50 rounded-xl text-cyan-700 text-lg mb-4 p-6">
          Hallo! Ich bin Vanessa, 31 Jahre alt, Psychologin und stolze Mutter
          der 9 Monate alten Emilia. Heute möchte ich euch von meiner
          aufregenden Reise mit Baby-led Weaning (BLW) erzählen mit euch teilen,
          was ich in den letzten Monaten gelernt habe.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-cyan-700 mb-4 flex items-center">
          <FaBaby className="mr-4 text-cyan-500" /> Definition von BLW
        </h2>
        <p className="text-gray-800 mb-4">
          Baby-led Weaning ist eine Methode der Beikosteinführung, bei der Babys
          von Anfang an selbstständig essen lernen. Statt gefüttert zu werden,
          bekommen die Kleinen feste Nahrung in mundgerechten Stücken oder auch
          Brei angeboten, die sie selbst greifen und essen können. Der
          Grundgedanke ist, dass Babys ihre Ernährung selbst steuern und von
          Beginn an am Familientisch teilnehmen.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-cyan-700 mb-4 flex items-center">
          <FaCarrot className="mr-4 text-cyan-500" /> Wie funktioniert BLW?
        </h2>
        <ul className="list-disc list-inside text-gray-800 mb-4">
          <li>
            Beginn mit etwa 6 Monaten, wenn dein Baby die Reifezeichen erfüllt
            und Interesse an Essen zeigt
          </li>
          <li>
            üblicherweise Anbieten von weichen, länglichen Lebensmitteln, die
            das Baby gut greifen kann
          </li>
          <li>Baby isst selbstständig mit den Händen oder Esslernbesteck</li>
          <li>Eltern essen mit und sind Vorbilder</li>
          <li>Kein Füttern oder Überreden zum Essen</li>
          <li>Baby bestimmt Tempo und Menge</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-cyan-700 mb-4 flex items-center">
          <FaAppleAlt className="mr-4 text-cyan-500" /> Geeignete erste
          Lebensmittel
        </h2>
        <p className="text-gray-800 mb-4">
          Bei Emilia habe ich mit folgenden Lebensmitteln begonnen:
        </p>
        <ul className="list-disc list-inside text-gray-800 mb-4">
          <li>Gedämpfte Gemüsesticks (Karotte, Brokkoli, Süßkartoffel)</li>
          <li>Weiche Obstsorten (reife Birne, Erdbeeren, Banane)</li>
          <li>Avocadostreifen</li>
          <li>Gekochte Pasta</li>
          <li>Toaststreifen mit Avocado oder Frischkäse</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-cyan-700 mb-4 flex items-center">
          <FaHeartbeat className="mr-4 text-cyan-500" /> Vorteile von BLW
        </h2>
        <ul className="list-disc list-inside text-gray-800 mb-4">
          <li>fördert die Entwicklung der Feinmotorik</li>
          <li>unterstützt ein gesundes Verhältnis zu Essen</li>
          <li>ermöglicht frühzeitige Geschmacks- und Texturerfahrungen</li>
          <li>stärkt das Selbstvertrauen des Babys</li>
          <li>erleichtert die Teilnahme an Familienmahlzeiten</li>
          <li>kann Übergewicht im späteren Leben vorbeugen</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-cyan-700 mb-4 flex items-center">
          <FaBook className="mr-4 text-cyan-500" /> Meine Erfahrungen mit Emilia
        </h2>
        <p className="text-gray-800 mb-4">
          Als ich mit Emilia BLW begann, war ich anfangs nervös und hatte Angst
          davor, dass sie sich verschluckt. Aber ich war erstaunt, wie schnell
          sie lernte, Nahrung zu greifen und zum Mund zu führen. Natürlich war
          es am Anfang sehr chaotisch und ich verbrachte viel Zeit damit, den
          Boden, die Wände, den Tisch und die Stühle zu putzen. Aber die Freude
          in Emilias Augen, wenn sie neue Lebensmittel entdeckte, war
          unbezahlbar.
        </p>
        <p className="text-gray-800 mb-4">
          Ein besonderer Moment war, als Emilia zum ersten Mal ein
          Brokkoli-Röschen selbstständig gegessen hat. Sie untersuchte es
          gründlich, führte es vorsichtig zum Mund und „kaute“ darauf herum. Ich
          war so stolz auf ihre Neugier und ihren Mut, Neues auszuprobieren.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-cyan-700 mb-4 flex items-center">
          <FaSmile className="mr-4 text-cyan-500" /> Tipps für BLW-Anfänger
        </h2>
        <ul className="list-disc list-inside text-gray-800 mb-4">
          <li>bleib entspannt und geduldig</li>
          <li>biete eine Vielfalt an Lebensmitteln an</li>
          <li>
            achte auf eine sichere Esssituation (aufrechte Sitzposition,
            Fußablage)
          </li>
          <li>lass dein Baby das Tempo bestimmen</li>
          <li>mach&aposs vor und iss mit deinem kleinen Schatz gemeinsam</li>
          <li>
            Bereite dich auf Unordnung vor (Bodenschutz, leicht abwischbare
            Kleidung)
          </li>
          <li>
            informiere dich über den Unterschied zwischen Würgen und
            Verschlucken
          </li>
          <li>besuche ggf. einen Erste-Hilfe-Kurs für Säuglinge</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-cyan-700 mb-4 flex items-center">
          <FaUsers className="mr-4 text-cyan-500" /> BLW und Familie
        </h2>
        <p className="text-gray-800 mb-4">
          BLW hat nicht nur Emilias Essverhalten positiv beeinflusst, sondern
          auch unsere gesamte Familienesskultur verändert. Wir achten jetzt mehr
          auf gesunde, vielfältige Mahlzeiten und genießen die gemeinsame Zeit
          am Tisch. Es ist wunderbar zu sehen, wie Emilia Teil unserer
          Essensroutine geworden ist und wie sie von uns lernt.
        </p>
        <p className="text-gray-800 mb-4">
          Natürlich gab es auch Herausforderungen. Mein Mann war anfangs
          skeptisch und besorgt über mögliche Erstickungsgefahren. Aber nachdem
          er sah, wie geschickt Emilia mit dem Essen umging und wie viel Freude
          sie dabei hatte, wurde auch er zum BLW-Fan. Auch die Großeltern
          mussten sich erst daran gewöhnen, dass wir Emilia keine Breie
          fütterten, aber mittlerweile sind sie begeistert von ihrer
          Selbstständigkeit.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-cyan-700 mb-4">Fazit</h2>
        <p className="text-gray-800 mb-4">
          Baby-led Weaning war für uns der richtige Weg. Es hat Emilia zu einer
          begeisterten und neugierigen Esserin gemacht. Natürlich ist BLW nicht
          für jede Familie geeignet und es ist wichtig, dass jeder den Weg
          findet, der für sich und sein Baby am besten passt. Aber ich kann nur
          ermutigen, es auszuprobieren. Die Unordnung und anfängliche
          Unsicherheit werden durch die Freude und das Selbstvertrauen, das euer
          Baby entwickelt, mehr als aufgewogen.
        </p>
        <p className="text-gray-800 mb-4">
          Egal, welchen Weg ihr wählt: Genießt die spannende Zeit der
          Beikosteinführung mit eurem kleinen Schatz!
        </p>
      </section>
    </div>
  );
};

export default WhatIsBlw;
