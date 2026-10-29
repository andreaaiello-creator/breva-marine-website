# BREVA — importazione automatica foto da Google Drive

La Action `Import BREVA marketing photos from Drive` scarica le immagini dalle sole cartelle Marketing approvate, ridimensiona il lato maggiore a 2200 px, converte in WebP (qualità 82) e salva in `public/assets/breva/`. Gli originali restano su Drive.

## Attivazione una tantum
1. Creare in Google Cloud un service account con Drive API abilitata, senza privilegi di modifica, usando JSON credenziali.
2. Condividere **solo le cartelle Marketing necessarie** con l'indirizzo email del service account dando accesso di sola lettura; in un Shared Drive potrebbe servire l'amministratore Workspace per la condivisione. Non condividere cartelle amministrative o documenti sensibili.
3. GitHub repository → Settings → Secrets and variables → Actions → New repository secret: `GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON`, contenente l'intero JSON credenziali. Non inviarlo in chat e non committarlo.
4. Il workflow va prima reso disponibile nel branch principale tramite review/merge della PR. Fino a quel momento GitHub potrebbe non mostrarlo nel pannello Actions. Non importare fotografie prima di aver verificato che il repository abbia la visibilità desiderata.
5. Actions → Import BREVA marketing photos from Drive → Run workflow. Seleziona `scope=b800-navigation`, `mode=plan`, `max_images=40`; scarica il report dalle Artifacts della run.
6. Dopo verifica esegui `mode=apply`: il bot caricherà esclusivamente i WebP sul branch `feat/import-lovable-prototype`, **mai su main**. Ripetendo il workflow salterà i file ottimizzati già presenti (nomi stabili).
7. Ripetere per altre cartelle; `all` importa tutte quelle mappate fino al limite per run.

## Mappature attuali
- B630 navigation/details
- B800 navigation/details
- B1300 navigation/details
- Shipyard production

**Non ancora automatiche:** static, B1100 versioni/renderings, B630/B800 foto statiche, loghi, font, brochure e altre directory di Drive: richiedono selezione e classificazione per non attribuire le foto al modello o alla categoria sbagliata. La cartella `interior` è riservata ai modelli B1100 e B1300.

## Limiti importanti
- Azione manuale, non schedulata. Si può aggiungere schedule solo dopo verifica.
- Accesso Drive del service account deve essere autorizzato: una semplice connessione Google Drive di ChatGPT non concede accesso alla GitHub Action.
- Immagini approvate e diritti di utilizzo sono responsabilità di chi seleziona le cartelle.
- Le foto non vengono automaticamente pubblicate sul sito; prima si verificano e si associano a home e schede modello.
- Git non è un DAM: se il numero di foto cresce molto, meglio conservare gli originali in Drive e usare CDN/object storage per i derivati, non milioni di immagini nel repository.
