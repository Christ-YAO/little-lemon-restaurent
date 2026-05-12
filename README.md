# Little Lemon — réservation de table

Application React (Create React App) pour le restaurant fictif **Little Lemon** (Chicago) : page d’accueil fidèle à la charte du cours (vert `#495E57`, jaune `#F4CE14`, saumon `#EE9972`) et **formulaire de réservation** avec validation, accessibilité et tests.

## Prérequis

- [Node.js](https://nodejs.org/) **18+** (LTS recommandé)
- npm (fourni avec Node)

## Installation

```bash
git clone <url-de-votre-depot>
cd little-lemon-restaurent
npm install
```

## Lancer le projet

```bash
npm start
```

Ouvre [http://localhost:3000](http://localhost:3000) : navigation par ancres (`#menu`, `#reservations`, etc.), mise en page responsive et menu mobile (≤ 900px).

## Tests

```bash
npx react-scripts test --watchAll=false --runInBand
```

`--runInBand` évite parfois les avertissements de fermeture des workers Jest sous Windows.

Sous PowerShell, pour un mode non interactif :

```powershell
$env:CI="true"; npx react-scripts test --watchAll=false --runInBand
```

## Build production

```bash
npm run build
```

Les fichiers statiques sont générés dans le dossier `build/`.

## Structure du code

| Dossier / fichier | Rôle |
|-------------------|------|
| `src/components/Header.js` | En-tête, skip link, navigation, menu mobile |
| `src/components/Hero.js` | Section héros + CTA vers le formulaire |
| `src/components/About.js` | Section « À propos » (ancre `#about`) |
| `src/components/Specials.js` | Spécialités (ancre `#menu`) |
| `src/components/Testimonials.js` | Témoignages |
| `src/components/BookingForm.js` | Formulaire de réservation |
| `src/utils/bookingValidation.js` | Règles de validation pures (testables) |
| `public/assets/icons_assets/` | Images et logos fournis avec le kit UI |

## Critères d’évaluation (pairs) — couverture

1. **UI / UX** : charte Little Lemon, typo Markazi Text + Karla, cartes spécialités, témoignages, héros avec visuel chef.
2. **Accessibilité** : `lang="fr"`, lien d’évitement, `<main>`, `<nav aria-label>`, labels reliés aux champs, `aria-invalid` / `aria-describedby`, messages d’erreur en `role="alert"`, confirmation via `<output aria-live="polite">`.
3. **Tests unitaires** : `src/utils/bookingValidation.test.js`, `src/components/BookingForm.test.js`, `src/App.test.js`.
4. **Formulaire fonctionnel + validation** : nom, e-mail, téléphone, date (pas dans le passé), heure (créneaux 17:00–22:00, pas dans le passé si aujourd’hui), convives 1–10, occasion obligatoire, notes optionnelles (max 500 caractères).
5. **Sémantique & responsive** : balises section/header/footer/address, grille CSS, breakpoints.
6. **Dépôt Git** : à pousser sur votre plateforme (GitHub, GitLab, etc.) — ce dépôt est déjà initialisé avec `.git`.
7. **Code maintenable** : composants découpés, validation isolée, commentaires ciblés sur la logique métier.
8. **Cas limites** : date invalide, heure hors plage, créneaux épuisés le jour même, notes trop longues, e-mail / téléphone incorrects, focus sur le premier champ en erreur.
9. **Documentation** : ce fichier + commandes ci-dessus.

## Licence / usage pédagogique

Projet à usage de formation ; les images du dossier `public/assets/` proviennent du kit du cours.
