/* ════════════════════════════════════════════════════════════════
   legal.mjs — Legal notice / Impressum / Mentions légales.

   FILL IN THE OPERATOR DETAILS BELOW, then run `node build.mjs`.
   Anything still written as «TODO …» is flagged by the build and
   shown highlighted on the page, so it cannot be missed.
   ════════════════════════════════════════════════════════════════ */

export const OPERATOR = {
  name:    '«TODO company / owner name»',
  address: '«TODO street, postcode, city»',
  country: 'Switzerland',
  email:   '«TODO contact e-mail»',
  uid:     '«TODO UID / commercial register number (if any)»',
  vat:     '«TODO VAT number (if any)»',
};

export const LEGAL = {
en: {
  htmlLang: 'en', title: 'Legal Notice — Pumpolino', h1: 'Legal Notice', back: '← Back to pumpolino.com',
  langLabel: 'Language', tag: 'for a world full of flow',
  sections: [
    ['Operator', ['{name}', '{address}', '{country}']],
    ['Contact', ['E-mail: {email}']],
    ['Registration', ['UID / register no.: {uid}', 'VAT no.: {vat}']],
    ['Disclaimer', ['The content of this website has been prepared with care. No guarantee is given for its accuracy, completeness or currency. Liability for damage arising from the use of this information is excluded as far as legally permitted.',
                    'Links to third-party websites are outside our control. The operators of linked sites are solely responsible for their content.']],
    ['Privacy', ['This site does not use cookies and has no analytics or tracking.',
                 'If you use the contact form, the details you enter (name, e-mail, subject, message) are transmitted to us through the form service Web3Forms and are used only to answer your enquiry.',
                 'To display the typefaces, your browser loads fonts from Google Fonts (fonts.googleapis.com), which transmits your IP address to Google.']],
  ],
},
de: {
  htmlLang: 'de-CH', title: 'Impressum — Pumpolino', h1: 'Impressum', back: '← Zurück zu pumpolino.com',
  langLabel: 'Sprache', tag: 'für eine Welt im Fluss',
  sections: [
    ['Betreiber', ['{name}', '{address}', 'Schweiz']],
    ['Kontakt', ['E-Mail: {email}']],
    ['Registereintrag', ['UID / Handelsregisternummer: {uid}', 'MWST-Nr.: {vat}']],
    ['Haftungsausschluss', ['Die Inhalte dieser Website werden mit Sorgfalt erstellt. Für Richtigkeit, Vollständigkeit und Aktualität wird keine Gewähr übernommen. Die Haftung für Schäden, die aus der Nutzung dieser Informationen entstehen, wird im gesetzlich zulässigen Umfang ausgeschlossen.',
                            'Auf Inhalte verlinkter Websites Dritter haben wir keinen Einfluss. Für diese sind ausschliesslich deren Betreiber verantwortlich.']],
    ['Datenschutz', ['Diese Website verwendet keine Cookies und setzt weder Analyse- noch Tracking-Werkzeuge ein.',
                     'Wenn Sie das Kontaktformular nutzen, werden Ihre Angaben (Name, E-Mail, Betreff, Nachricht) über den Formulardienst Web3Forms an uns übermittelt und ausschliesslich zur Beantwortung Ihrer Anfrage verwendet.',
                     'Zur Darstellung der Schriften lädt Ihr Browser Schriftdateien von Google Fonts (fonts.googleapis.com); dabei wird Ihre IP-Adresse an Google übermittelt.']],
  ],
},
fr: {
  htmlLang: 'fr-CH', title: 'Mentions légales — Pumpolino', h1: 'Mentions légales', back: '← Retour à pumpolino.com',
  langLabel: 'Langue', tag: 'pour un monde en mouvement',
  sections: [
    ['Exploitant', ['{name}', '{address}', 'Suisse']],
    ['Contact', ['E-mail : {email}']],
    ['Inscription au registre', ['IDE / n° du registre du commerce : {uid}', 'N° de TVA : {vat}']],
    ['Exclusion de responsabilité', ['Le contenu de ce site est élaboré avec soin. Aucune garantie n’est donnée quant à son exactitude, son exhaustivité ou son actualité. Toute responsabilité pour les dommages résultant de l’utilisation de ces informations est exclue dans la mesure permise par la loi.',
                                     'Nous n’exerçons aucun contrôle sur les sites tiers vers lesquels pointent des liens ; leurs exploitants en sont seuls responsables.']],
    ['Protection des données', ['Ce site n’utilise ni cookies ni outils d’analyse ou de suivi.',
                                'Si vous utilisez le formulaire de contact, les données saisies (nom, e-mail, objet, message) nous sont transmises par le service de formulaires Web3Forms et ne servent qu’à répondre à votre demande.',
                                'Pour afficher les polices, votre navigateur charge des fichiers depuis Google Fonts (fonts.googleapis.com), ce qui transmet votre adresse IP à Google.']],
  ],
},
};
