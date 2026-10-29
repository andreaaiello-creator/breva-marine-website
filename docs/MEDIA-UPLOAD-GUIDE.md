# BREVA Media Library — istruzioni caricamento

**Branch di lavoro:** feat/import-lovable-prototype. Non caricare su main. Non fare merge senza controllo.

## Dove caricare
- `b630/`, `b800/`, `b1100/`, `b1300/`: ogni modello ha navigation, exterior, interior, details, layouts, renderings, videos, brochures, press.
- `brand/logos/`: positive (sfondo chiaro), negative (sfondo scuro), pictogram, vector (SVG). Non ridisegnare il marchio.
- `brand/fonts/`: esclusivamente file webfont per cui esiste diritto di embedding; preferire WOFF2. Non pubblicare gli originali TTF/ZIP.
- `brand/brand-guidelines/`: solo versioni espressamente pubblicabili; i manuali interni restano su Drive.
- `shipyard/`: production, people, quality.
- `case-studies/`: owners, charter, dealers, professional. Utilizzare immagini e nomi di clienti solo con consenso.
- `lifestyle/`, `events/`, `campaigns/`, `press/`, `social/`, `technology/`, `partners/`, `videos/`: materiale editoriale condiviso.
- `brochures/`: brochure generali; i cataloghi di singolo modello vanno nella rispettiva cartella brochures.

## Regole
1. Metti nel repository solo media approvati per pubblicazione. Originali RAW, documenti confidenziali, dati clienti e costi restano in Google Drive.
2. Preferisci JPEG/PNG per il caricamento iniziale; ottimizzeremo in WebP/AVIF dopo la selezione. SVG preferito per i loghi; PDF solo per brochure realmente pubbliche. Video molto grandi vanno su hosting video, non in Git.
3. Nomi chiari in minuscolo senza spazi, ad esempio `b800-navigation-port-01.jpg`, `b1300-rendering-open-01.png`.
4. Non confondere rendering e fotografie reali.
5. Limite browser GitHub: 25 MB per file; per lotti molto grandi conviene un trasferimento locale con Git oppure un archivio asset esterno.
6. I file `.gitkeep` sono segnaposto e possono restare; non devono apparire sul sito.
7. Dopo il caricamento indicaci la cartella aggiornata per collegare foto, alt text, gallerie e pagine.

## Fonti Drive esaminate
MARKETING contiene PICTURE GALLERY, GRAFICHE, LOGHI E SCRITTE, CORPORATE IDENTITY, CATALOGHI, VIDEO GALLERY, SITO, SOCIAL, STAMPA, FIERE_EVENTI, SERVIZI FOTOGRAFICI e altre cartelle. La raccolta BREVA MARINE MARKETING MATERIAL contiene B630/B800/B1100/B1300, loghi ufficiali, foto cantiere e fotografie combinate.

Questa struttura è una convenzione di caricamento: non attesta ancora che le fotografie siano state importate.
