# Installieren

Um dieses Projekt zu installieren können Sie entweder die .zip datei auf https://github.com/m-viefeld/eigenanteil-semi herunterladen und lokal entzippen oder Sie installieren [git](https://git-scm.com/downloads) und geben in ihr terminal die anweisung

```
git clone https://github.com/m-viefeld/eigenanteil-semi
```

# Tools

Um dieses Programm zu verwenden, benötigen Sie 2 tools:

- [node](https://nodejs.org/en/) (v14 oder höher)
- [npm](https://www.npmjs.com/) (v7 oder höher)

Npm wird zusammen mit einer [node installation](https://nodejs.org/en/download/) installiert.

Andere dinge, die sie brauchen, die Sie aber vermutlich bereits besitzen:

- ein terminal (zum beispiel cmd)

Dieses Programm verwendet die Programmiersprachen [JavaScript](https://www.javascript.com/) und [Svelte](https://svelte.dev/), wobei letzteres eine erweiterung für HTML ist.

Für das beste Aussehen und Syntax-Highlighting empfehle ich ihnen [Visual Studio Code](https://code.visualstudio.com/) zusammen mit der [VSCode Svelte Extension](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)

# Verwenden

Wenn Sie alle benötigten Voraussetzungen haben und sie schon eine fertig kompilierte version haben, dann können Sie diese starten, indem Sie cmd in diesem Ordner öffnen und then command

```
node build/
```

starten. Eine weitere Möglichkeit wäre, dass Sie in dem Ordner, in dem dieses Programm kompiliert wurde (./build/) cmd öffnen und entweder

```
npm start
```

eingeben oder

```
node .
```

Jetzt sollten Sie, wenn sie in ihrem Browser zu http://localhost:3000 navigieren dort die Webseite sehen können.

# Kompilieren

Wenn sie noch kein fertig kompiliertes Programm haben, dann öffnen Sie in diesem Ordner cmd und geben Sie

```
npm ci
```

ein, um alle nötigen module zu installieren und im Anschluss geben Sie

```
npm run build
```

ein, um das Programm zu kompilieren.

Um das Programm zu verwenden, verfahren Sie wie [oben erklärt](#verwenden).
