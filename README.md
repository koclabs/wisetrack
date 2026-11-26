# WiseTrack · phone and viewing-screen version

**English** · [Türkçe](README.tr.md) · [Español](README.es.md) · [العربية](README.ar.md) · [Русский](README.ru.md) · [中文](README.zh.md) · [日本語](README.ja.md) · [한국어](README.ko.md)

**▶ Open the app: [koclabs.github.io/wisetrack](https://koclabs.github.io/wisetrack/)** — runs in the browser on phones, tablets and computers; nothing to install. On a phone, add it to the home screen ([section 2](#2-installing-on-the-phone)). Section 1 is only needed if you want to host your own copy.

WiseTrack is browser-based rodent behaviour tracking software. This folder is the web version that runs like an app on a phone (PWA). The same files run on iPhone, Android, tablets and computers.

| File | Purpose |
|---|---|
| `index.html` | The app that does the tracking (opened on the phone) |
| `izle.html` | Viewing screen: opened on a PC, TV browser or tablet; shows the phone's image and results live |
| `sw.js`, `*.webmanifest`, `icons/` | Installation as an app and offline use |
| `vendor/` | Mirroring (PeerJS, MIT) and QR code (qrcode-generator, MIT) libraries |
| `i18n/` | Interface translations (English, Spanish, Arabic, Russian, Chinese, Japanese, Korean) |

**Supported interface languages:** Türkçe, English, Español, العربية, Русский, 中文, 日本語, 한국어. The language is chosen from the menu in the top bar; see [Interface language](#interface-language).

## Versions and citation

The version analysed in the paper (v10) is archived on Zenodo (DOI [10.5281/zenodo.24535051](https://doi.org/10.5281/zenodo.24535051), commit [`0704db8`](https://github.com/koclabs/wisetrack/tree/0704db8)). Later versions add automatic calibration and camera corrections (v11), batch video analysis (v12) and additional interface languages (v13). To reproduce the analyses in the paper, use the archived version.

WiseTrack is released under the MIT License (see `LICENSE`). Citation details are in `CITATION.cff`.

## 1. Publishing (once, about 5 minutes)

Phone browsers open the camera only on **https://** addresses. Copying the files directly onto the phone does not work; they must be placed on a free https address.

**GitHub Pages (recommended, permanent and free)**
1. Create a free account on github.com and use **New repository** to create a *public* repository, for example `wisetrack`.
2. Use **Add file → Upload files** to drag in the *contents* of this folder (with index.html at the top level) and click **Commit**.
3. **Settings → Pages → Branch: main / (root) → Save**. After a minute or two your address is `https://USERNAME.github.io/wisetrack/`.

Alternative: dragging the folder onto Netlify Drop (app.netlify.com/drop) also gives an https address; to keep it permanently you need to claim it with a free account.

When you update, upload the files again and increase the `VERSION` value in `sw.js` (e.g. from `wisetrack-v13` to `wisetrack-v14`); phones pick up the new version the next time the app is opened.

## 2. Installing on the phone

- **iPhone / iPad:** Open the address in **Safari** → Share icon → **Add to Home Screen**. On first start, tap “Allow” for camera access.
- **Android:** Open the address in **Chrome** → menu (⋮) → **Install app** (or “Add to Home screen”).

Once installed, tracking works without internet. Mirroring needs internet.

## 3. Setting up the phone for tracking

- Fix the phone **directly above** the arena with a tripod or holder; it must not move or rotate during the experiment.
- Use the **main (1×) rear camera**. An ultra-wide (0.5×) lens or a wide-angle webcam bends the edges; this distortion can be corrected with **Measure lens distortion from the arena** (below), but the main camera still gives the cleanest image.
- After setting the light, tap **Lock exposure and focus** (works on Android; the iPhone browser does not allow it, so use steady, even lighting).
- Keep the phone on the charger during long sessions. The screen stays on while the app is open; if you leave the app, the session is paused for safety.

### Automatic calibration and camera corrections

In Setup > Test apparatus and calibration:

- **Find arena automatically**: tap while the arena is empty. The app separates the floor starting from the middle of the image, fits the arena's known shape (square, circle or plus) to its edges with sub-pixel accuracy and places the points. In circular arenas (water maze, Barnes), if the camera is tilted the centre of the circle does not appear at the centre of the ellipse; the app calculates it from the camera geometry. In the plus maze the closed arms are recognised by their walls; if this is uncertain, correct it with **Swap arms**. If the walls are the same colour as the floor, the points may snap to the top of the walls; the app warns when it detects this.
- **Check calibration**: shows how many cm the arena edge in the image deviates from the model on average (≤0.5 cm good, >1.5 cm check the points). This value is also measured automatically at the start of every trial and written to the Excel/CSV summary.
- **Animal height correction** (in the Camera, lens and animal height section): the camera sees the animal's back, not its position on the floor. The camera height and position are estimated from the arena points (enter the height if you measured it), and the tracking point is projected onto the floor. Without correction, positions near the edges shift outwards even with the camera straight overhead, and the total distance is overestimated by roughly animal height / (camera height − animal height) (rat, camera at 75 cm: ≈ 5.6%).
- **Measure lens distortion from the arena**: no chessboard is needed; the app finds the distortion coefficient that makes the arena's straight edges straight (the rim an ellipse in circular arenas).
- **Watch for camera shift** (on by default): if the camera or phone is knocked during a trial, the arena edge is compared with the first frame every second; if a shift is found, the points and the empty-arena reference are moved together and the event is recorded in the summary.
- In the results, a warning appears if the animal's apparent size changes clearly from one side of the arena to the other (tilted camera or shifted points).

Validation with synthetic videos (known camera position, lens distortion and rat size, 4 cm tracking height): with an 18° tilted camera and marked distortion, even with the points placed exactly by hand, the uncorrected position error was 1.3 cm median and 3.1 cm at the 95th percentile, and distance was overestimated by 9.8%; with automatic calibration + lens + height correction the error was 0.16 cm median, 0.8 cm at the 95th percentile, and the distance difference 0.2%. With an 80° wide-angle camera 1.9 → 0.2 cm, in the water maze (camera at 220 cm) 0.34 → 0.26 cm, in the Barnes maze 1.6 → 0.2 cm. With a 2 cm camera shift in the middle of a trial, the median error was 1.7 cm without correction and 0.15 cm with shift monitoring.

### Interface language

The language menu in the top bar offers Türkçe (Turkish), English, Español (Spanish), العربية (Arabic), Русский (Russian), 中文 (Chinese), 日本語 (Japanese) and 한국어 (Korean). On first start the browser language is used (English if it is not supported); the choice is remembered on the device. Changing the language reloads the page. Add `?lang=xx` to a link (`en`, `tr`, `es`, `ar`, `ru`, `zh`, `ja`, `ko`) to open the app in a given language. Excel/CSV headers, zone names and the compass letters drawn on the image also follow the chosen language; the Arabic interface is laid out right to left. Translations are in the `i18n/` folder (the keys are the Turkish source strings).

## 4. Mirroring to another screen

**The app's own mirroring (works on every device):** On the phone, go to **Mirror → Start mirroring**. Scan the QR code with the tablet's camera, or open `…/izle.html` in a computer or TV browser and enter the 6-character code. The labelled live image, time, zone table and distance appear there. If “Allow start/stop from the viewing screen” is on, you can run the trial from there without approaching the arena. The code is stored on the phone; if you bookmark the viewing page on the TV once, it connects with the same code in later experiments. Several screens can be connected at the same time.

How it works: the two devices only find each other through the free PeerJS server; the image and data flow directly between the devices (WebRTC, encrypted). If the institution's network blocks device-to-device connections, turn on the phone's personal hotspot and connect the viewing device to it.

**Operating-system mirroring (additional option):**

| Phone → | Mac | Windows PC | TV | Tablet |
|---|---|---|---|---|
| iPhone | AirPlay (macOS 12+) | izle.html | Apple TV / AirPlay 2 TV | izle.html |
| Android | scrcpy (USB, free) | scrcpy (USB, free) | Cast / Smart View / Chromecast | izle.html |

## 5. Exporting results

In the Results tab, **Excel (.xlsx)** gives four sheets in one file: *Summary* (metrics and the settings used), *Zones*, *Position log* (frame-by-frame X/Y, speed, zone) and *Single row* (a one-row result per animal that can be pasted straight into your group table). CSV and PNG options are also available. On a phone, exporting opens the share menu, where Drive, Files or e-mail can be chosen.

## 6. Novel object recognition (NOR)

In Setup > Test apparatus, choose **Object recognition** and set the phase (Habituation / Familiarisation / Test). With the objects in the arena and no animal present, tap **Find objects automatically**: the objects are found and the same frame is saved as the empty-arena reference (this keeps the objects from being taken for the animal). You can drag the found objects in the image to move them, resize them with the white square handle, change their shape (circle/rectangle), delete them or add objects by hand. In the test phase, recording does not start until you choose which object is novel.

By default, exploration is counted when the animal's **nose point** is closer than 2 cm to the object; if the body centre is on top of the object (climbing), it is not counted as exploration. The nose point is estimated from the body shape (the head end is narrower) and the direction of movement; it appears on screen as a cyan dot. The results give, for each object, the exploration time, number of explorations and first-exploration latency; in the test phase, the discrimination index DI = (Novel − Familiar) / (Novel + Familiar) and the recognition index RI. The nose estimate should be validated against a few hand-scored videos; if needed, the criterion can be switched to “Centre point”.

**Objects the same colour as the animal.** The app takes three measures so that an object itself is not taken for the animal: (1) with the live camera, when “Start when the animal is detected in the arena” is on and Start is pressed, the empty arena (with the objects in their final positions) is saved again automatically; meanwhile the screen shows “Saving the empty arena, don't put the animal in yet”. (2) Each object is then checked; an object that still looks like the animal despite the empty-arena reference (for example because it was moved after the reference was saved, or because a video has no reference) is excluded from animal detection for that trial, a warning appears, and this is written to the Excel summary. (3) A blob lying entirely on an object is never chosen as the animal, except when the animal was just there (climbing). Climbing cannot be detected on an excluded object, and the nose tip within 0.5 cm of the object is not visible; exploration time may therefore come out slightly low. The Setup option “Always exclude object areas from animal detection” applies the same exclusion in every trial.

## 7. Morris water maze (MWM)

In Setup > Test apparatus, choose **Water maze**, enter the pool and platform diameters, and choose the phase (Training / Probe test / Visible) and the start point. Drag the N, E, S, W points in the image onto the north, east, south and west marks on the pool rim; drag the platform in the image to its real position. The target and opposite quadrants are set automatically from the platform's position. With no animal present, save the empty pool with Detection > **Save empty arena**; this keeps steady light reflections on the water surface from being taken for the animal. When the water maze is selected, the trial duration is set to 60 seconds.

- **Training and visible platform:** the trial ends automatically when the animal's centre point enters the platform area and stays there for the set time (default 2 s). Escape latency (first arrival at the platform), whether the platform was found, path length, path efficiency (straight-line distance from start to platform / distance swum), time in the target quadrant, mean distance to the platform, time near the wall (thigmotaxis) and swim speed are given. If the platform is not found before time runs out, the escape latency is recorded as the trial duration.
- **Probe test:** the percentage of time in the target and opposite quadrants, the number of platform-location crossings, the time of first arrival at the platform location and the mean distance to the platform are given. The zone transition time is not applied to platform-location crossings.

In the *Single row* sheet of the Excel file, the “Target quadrant” and “Opposite quadrant” columns have the same names for every animal, so results can be pasted one below another even if the platform position differs between groups.

## 8. Barnes maze

In Setup > Test apparatus, choose **Barnes maze**; enter the platform diameter, the number of holes, the hole diameter and the distance from the hole centre to the platform edge (default mouse platform: 92 cm, 20 holes, 5 cm). Drag the N, E, S, W points to the platform edge; **point N must be in line with hole 1**, and the holes are numbered clockwise. If the drawn ring of holes does not match the holes in the image, tap **Align holes automatically** or rotate it with the slider. Choose the target (escape) hole from the list or tap the hole in the image. With no animal present, save the empty platform with Detection > **Save empty arena**; otherwise the dark holes (especially with a black animal) may be taken for the animal. When the Barnes maze is selected, the trial duration is set to 180 seconds.

- **Hole visit:** a visit is counted when the animal's nose point comes within 1 cm (adjustable) of the edge of a hole. Every visit to a non-target hole is an error; repeated visits to the same hole also count.
- **Training:** primary latency, primary errors and primary path (until the first visit to the target hole), and total latency, total errors and total path (until the animal enters the escape box) are given. When the animal vanishes from the image next to the target hole for 1 second (adjustable), it is counted as having entered the escape box and the trial ends; the moment it vanished is the total latency.
- **Probe test:** the number of visits to the target hole and to the other holes, the target-hole visit ratio, the time in the target quadrant and the primary measures are given.
- **Search strategy** is suggested automatically: *Direct* (at most 3 errors, all within 2 holes of the target), *Serial* (at least 3 consecutive neighbouring holes in one direction), all others *Random*. The hole visit sequence is written to the Excel summary; the suggestion should be checked against this sequence.

In the *Single row* sheet of the Excel file, the hole columns are named “Hole 1 … Hole N” and the quadrant columns “Target quadrant”, “Opposite quadrant” and the two adjacent quadrants, so results can be pasted one below another even when the target hole changes from animal to animal.

## 9. MPG, AVI and other video formats

Browsers open MP4 (H.264), MOV and WebM videos directly. When formats such as MPG/MPEG (MPEG-1/2), VOB, AVI, WMV, FLV or TS/MTS are chosen, the app shows a **Convert to MP4 and open** button. Conversion is done entirely on the device with ffmpeg.wasm; the video is not sent anywhere. The converter (about 32 MB) is downloaded from jsDelivr on first use and stays in the browser cache, so internet is needed for the first conversion. Interlaced DVR/DVD recordings are deinterlaced automatically, and the image is reduced to at most 960 pixels wide. On a computer, a 1-minute standard-definition video converts in about half a minute; it is slower on a phone. If the converted file is kept with **Save converted video**, the same video does not need to be converted again when it is reanalysed.

ffmpeg.wasm (@ffmpeg/core 0.12.10) is licensed GPL-2.0-or-later; the app only loads it from the CDN at run time. Source code: https://github.com/ffmpegwasm/ffmpeg.wasm

### Analysis speed

When analysing a video, the speed option is an upper limit. Because the browser can deliver at most as many frames per second as the screen refresh rate (usually 60) and a busy device may also drop frames, the app sets the speed itself so that every frame is processed: it speeds up while no frames are dropped and slows down as soon as one is. When the analysis ends, the mean speed and the proportion of skipped frames are shown and written to the Excel/CSV summary; if the proportion is above 1%, the analysis should be repeated with a lower speed limit. Smoothing is applied by time rather than by number of frames, so the same video gives the same result at whatever speed it is analysed.

### Batch video analysis

The **5 · Batch video analysis** card at the end of the Setup tab analyses videos recorded with the same apparatus one after another:

1. Choose several videos with **Add videos** (on a computer you can also drag and drop them onto the card). The list is sorted by file name; the animal code is taken from the file name and can be changed in the table. In object recognition you can choose the novel object, and in the water maze the start point, separately for each row.
2. Set up the arena (and the objects in object recognition), the threshold and the duration once with **Open the first video for setup**.
3. Options: **Arena placement** can be the same in all videos or found automatically in each video (if the camera moved between videos). The **Empty-arena reference** is by default extracted from each video itself: across 21 frames spread over the video the animal is at any given point in only a few frames, so the 30th percentile of each pixel (albino animal) or the 70th percentile (dark animal) gives the floor without the animal.
4. **Start batch analysis**. Formats such as MPG/AVI are converted automatically when their turn comes. Videos that cannot be opened or in which the animal is not found are marked and skipped; the analysis does not stop. A list interrupted with **Stop** can be continued with **Analyse the rest**.
5. When it finishes, the **Batch Excel** file downloads automatically on a computer (tap the button on a phone). Sheets: *Batch results* (one row per video, with all measures from the single-video Excel file), *Zones* (long format), *Quality* (detected/skipped frames, calibration deviation, camera shift, warnings), *Settings* and, optionally, *Position log*.

During the analysis the tab must stay open and in front, because the browser does not deliver video frames to a background tab. If the tab is sent to the background, the analysis pauses and continues where it left off when you return. The screen does not turn off by itself.

## 10. Offline single-file version (for computers)

`wisetrack.html` is also provided separately: download it to a computer and double-click to open it in Chrome or Edge; no installation, internet or account is needed. Everything works, including the camera, video analysis, Excel export and all interface languages; only in-app mirroring is off in this version, and converting formats such as MPG needs internet. Because downloaded HTML files do not open reliably on phones, use the web address + add-to-home-screen route on a phone.

## 11. Your own signalling server (optional)

If the public PeerJS server cannot be reached, or you want to stay inside the institution, run `npx peer --port 9000` on a computer on the network and open both pages with `?ps=SERVER_IP:9000` (if there is no https, also add `&pss=0`).

## Next step: native app

This code base will be packaged with Capacitor as an Android app (APK) and an iOS app (Xcode project). The native version will add exposure/focus lock on iPhone, uninterrupted recording in the background and higher frame rates.
