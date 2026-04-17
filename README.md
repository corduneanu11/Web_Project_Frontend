# Hybrid Calisthenics - Web App

Acest proiect este o platforma web interactiva dedicata antrenamentelor hibride (care imbina gimnastica de baza si hipertrofia cu greutati). Construit in React + Vite, aplicatia imbina comertul electronic (magazinul) cu o experienta de gamificare pentru atleti. 

## 📌 Functionalitati Principale

### 1. Pagina Principala
- **Prezentare:** Sectiune principala "Hero" full-screen (responsive) cu un buton de call-to-action dinamic.
- **Flux Utilizator:** Acces direct spre componentele majore: Joc, Magazin sau Contact direct de pe pagina principala.
- **Design Adaptativ:** Tema modern-dark (neon/purple), cu elemente de sticla (glassmorphism) in navigatie si footere usor blurate. Adaptabil complet pe telefon, tableta (iPad) si desktop.

### 2. Autentificare & Inregistrare Hibrida
- **Register Functional:** Userii isi cer un Nume, Email, Parola si Confirmarea Parolei intr-un mediu estetic cyber-neon. Informatiile se mentin local (in `localStorage` ca mini-baza de date), asigurand relogari de succes.
- **Modal de Bun Venit:** Dupa autentificarea cu succes, un mesaj pop-up atrage atentia atletului sa aleaga noua lui cale in modulul "Joc".

### 3. Modulul "Joc"
Aici, antrenamentul e transformat in progres de tip RPG prin "Skill Trees":
- **Calea Fortei Absolute:** Ramura de antrenament axata pe manevrarea greutatii corporale (ex. flotari, front lever, muscle-up).
- **Calea Masei Musculare:** Mod blocat initial, necesitant Nivelul 10 pe Forta pentru deblocare, concentrandu-se pe hipertrofie cu greutati suplimentare.
- **Sistemul YouTube:** O dovada trebuie plasata sub forma unui link de YouTube pentru a dovedi antrenamentul. Sistemul valideaza intrarea, aratand statusul de "Asteptare verificare".
- **Harta Interactiva:** Progresul se vede live sub forma unei harti flexibile direct pe ecran, aratand unde te aflii in acest moment sau ce niveluri sunt restrictionate.
- **Leaderboard Global:** Extragere dinamica in clasament ordonand jucatorii dupa totalul nivelurilor atinse la Masa & Forta. Extrage automat Numele de utilizator, precum si "Titlul Oficial" obtinut!

### 4. Magazinul Online & Cosul dinamic
- **Produse Dedicate:** Magazin functional impartit in produse fizice (Armory/Baza) si Suplimente. 
- **Fly-to-Cart Animation:** Dupa apasarea pe 'Adauga', o clona animata si rotunda a produsului vizat pleaca direct de pe afis si aterizeaza lin in cosul din `Navbar`, oferind satisfactie si feedback instant. Functioneaza inteligent adaptandu-se pe rezolutii mobile sau PC.
- **Cos & Checkout:** Cantitatile raman in sectiunea de Checkout unde poate fi calculat totalul si finalizata comanda, structura avand elemente speciale pe rezolutiile compacte pentru un scroll cursiv.

### 5. Profilul Personalizat
- **Monitorizare Live:** Iti poti evalua rapid nivelul la forta cat si masa musculara cu procente si un nivel global total combinat.
- **Schimbarea Titlurilor / Trofeelor:** Pe masura avansarii pe nivele in *"Joc"*, userii obtin titluri (ex: "Amator", "Atlet", "Titan Colosal"). Poti selecta in timp real, dintr-un meniu, felul in care esti strigat, titlul actualizandu-se ulterior atat in baza de date vizuala proprie cat si in marea tabela *Leaderboard*.

### 6. Panoul de Autoritate
- Logarea pe contul de administrare (user:`admin`, parola referentiata intern) activeaza permisiunile super-user, avand capacitatea de a aproba tranzactiile YouTube sau reportarile intocmite de concurenti pe sectiunea dedicata.

### 7. Navigatia Inteligenta
- Sistem avansat de rutaj si notificare live prin React. Pe ecranele mari bara isi extinde link-urile uniform, pe cand la ecrane sub `1024px` se deschide iconita "Hamburger" cu rolul decuplarii elegante ale ramurilor de site intr-o lista verticala prietenoasa. Iconitele Cos / Alerta se asigura de fluiditate mentinandu-se vizibile!

---
> **Nota Tehnica:** Proiectul se deschide accesand fisierul principal prin `npm run dev` sau build de productie, toate persistentele vizuale se rezolva in mod asincron din `localStorage` pentru demonstratii capabile fara dependente externe pe servere backend in prezent.
