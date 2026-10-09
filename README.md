# WiseTrack · telefon ve izleme ekranı sürümü

Bu klasör, WiseTrack'in telefonda uygulama gibi çalışan web sürümüdür (PWA). Aynı dosyalar iPhone'da, Android'de, tablette ve bilgisayarda çalışır.

| Dosya | Görevi |
|---|---|
| `index.html` | Ölçümü yapan uygulama (telefonda açılır) |
| `izle.html` | İzleme ekranı: PC, TV tarayıcısı ya da tablette açılır, telefonun görüntüsünü ve sonuçlarını canlı gösterir |
| `sw.js`, `*.webmanifest`, `icons/` | Uygulama olarak kurulum ve çevrimdışı çalışma |
| `vendor/` | Yansıtma (PeerJS, MIT) ve QR kod (qrcode-generator, MIT) kütüphaneleri |

## 1. Yayına alma (bir kez, ~5 dakika)

Telefon tarayıcıları kamerayı yalnızca **https://** adreslerinde açar. Dosyaları doğrudan telefona kopyalamak işe yaramaz; ücretsiz bir https adresine koymanız gerekir.

**GitHub Pages (önerilen, kalıcı ve ücretsiz)**
1. github.com'da ücretsiz hesap açın, **New repository** ile örneğin `wisetrack` adlı *public* bir depo oluşturun.
2. **Add file → Upload files** ile bu klasörün *içindekileri* (index.html en üst düzeyde olacak şekilde) sürükleyip **Commit** deyin.
3. **Settings → Pages → Branch: main / (root) → Save**. Bir iki dakika sonra adresiniz `https://KULLANICIADI.github.io/wisetrack/` olur.

Alternatif: Netlify Drop (app.netlify.com/drop) sayfasına klasörü sürükleyip bırakmak da https adresi verir; kalıcı olması için ücretsiz hesapla sahiplenmeniz gerekir.

Güncelleme yaptığınızda dosyaları yeniden yükleyin ve `sw.js` içindeki `VERSION` değerini artırın (ör. `wisetrack-v4`); telefonlar yeni sürümü bir sonraki açılışta alır.

## 2. Telefona kurulum

- **iPhone / iPad:** Adresi **Safari**'de açın → Paylaş simgesi → **Ana Ekrana Ekle**. İlk açılışta kamera iznine “İzin Ver” deyin.
- **Android:** Adresi **Chrome**'da açın → menü (⋮) → **Uygulamayı yükle** (ya da “Ana ekrana ekle”).

Kurulduktan sonra ölçüm internetsiz de çalışır. Yansıtma için internet gerekir.

## 3. Ölçüm için telefon düzeni

- Telefonu arenanın **tam üstüne**, bir tripod ya da tutucuyla sabitleyin; deney boyunca oynamamalı ve döndürülmemeli.
- **Ana (1×) arka kamerayı** kullanın. Ultra geniş (0,5×) lens kenarları büker ve bu bükülme dört noktalı kalibrasyonla düzeltilemez.
- Işığı ayarladıktan sonra **Pozlama ve odağı kilitle**ye dokunun (Android'de çalışır; iPhone tarayıcısı buna izin vermez, sabit ve homojen ışık kullanın).
- Uzun oturumlarda telefonu şarja takın. Ekran uygulama açıkken kapanmaz; uygulamadan çıkarsanız oturum güvenlik için duraklatılır.

## 4. Başka ekrana yansıtma

**Uygulamanın kendi yansıtması (her cihazda çalışır):** Telefonda **Yansıt → Yansıtmayı başlat**. Çıkan QR kodu tabletin kamerasıyla okutun ya da bilgisayar/TV tarayıcısında `…/izle.html` adresini açıp 6 haneli kodu girin. Etiketli canlı görüntü, süre, bölge tablosu ve mesafe gelir. “İzleme ekranından başlat/durdur” açıksa deneyi arenaya yaklaşmadan oradan yönetebilirsiniz. Kod telefonda saklanır; TV'de izleme sayfasını bir kez yer imine eklerseniz sonraki deneylerde aynı kodla bağlanır. Aynı anda birden fazla ekran bağlanabilir.

Nasıl çalışır: iki cihaz, ücretsiz PeerJS sunucusu üzerinden yalnızca birbirini bulur; görüntü ve veriler cihazlar arasında doğrudan (WebRTC, şifreli) akar. Kurum ağı cihazlar arası bağlantıyı engellerse telefonun kişisel erişim noktasını (hotspot) açıp izleme cihazını ona bağlayın.

**İşletim sisteminin yansıtması (ek seçenek):**

| Telefon → | Mac | Windows PC | TV | Tablet |
|---|---|---|---|---|
| iPhone | AirPlay (macOS 12+) | izle.html | Apple TV / AirPlay 2 TV | izle.html |
| Android | scrcpy (USB, ücretsiz) | scrcpy (USB, ücretsiz) | Yayınla / Smart View / Chromecast | izle.html |

## 5. Sonuçları dışa aktarma

Sonuçlar sekmesinde **Excel (.xlsx)** tek dosyada dört sayfa verir: *Özet* (metrikler ve kullanılan ayarlar), *Bölgeler*, *Konum kaydı* (kare kare X/Y, hız, bölge) ve *Tek satır* (her hayvan için tek satırlık sonuç; grup tablonuza doğrudan yapıştırılır). CSV ve PNG seçenekleri de durur. Telefonda dışa aktarma paylaşım menüsünü açar; Drive, Dosyalar ya da e-posta seçilebilir.

## 6. Yeni obje tanıma (NOR)

Kurulum > Test düzeneği'nde **Obje tanıma**'yı seçin ve aşamayı (Alışma / Tanışma / Test) belirleyin. Objeler arenadayken ve hayvan yokken **Objeleri otomatik bul**'a dokunun: objeler bulunur ve aynı kare boş arena referansı olarak kaydedilir (bu, objelerin hayvan sanılmasını önler). Bulunan objeleri görüntüde sürükleyerek taşıyabilir, beyaz kare tutamaçla boyutlandırabilir, şeklini (daire/dikdörtgen) değiştirebilir, silebilir ya da elle obje ekleyebilirsiniz. Test aşamasında hangi objenin yeni olduğu seçilmeden kayıt başlamaz.

Keşif, varsayılan olarak hayvanın **burun noktasının** objeye 2 cm'den yakın olmasıyla sayılır; gövde merkezi objenin üstündeyse (tırmanma) keşif sayılmaz. Burun noktası gövde şeklinden (baş ucu daha dar) ve hareket yönünden tahmin edilir; ekranda camgöbeği bir nokta olarak görünür. Sonuçlarda her obje için keşif süresi, keşif sayısı, ilk keşif latansı; testte ayırt etme indeksi DI = (Yeni − Tanıdık) / (Yeni + Tanıdık) ve tanıma indeksi RI verilir. Burun tahmini, el ile skorlanmış birkaç videoyla karşılaştırılarak doğrulanmalıdır; gerekirse ölçüt “Merkez noktası”na alınabilir.

## 7. Morris su labirenti (MWM)

Kurulum > Test düzeneği'nde **Su labirenti**'ni seçin, havuz ve platform çapını girin, aşamayı (Öğrenme / Prob testi / Görünür platform) ve başlangıç noktasını seçin. Görüntüdeki K, D, G, B noktalarını havuz kenarındaki kuzey, doğu, güney ve batı işaretlerine sürükleyin; platformu görüntüde sürükleyerek gerçek yerine koyun. Hedef ve karşı çeyrek platformun konumundan kendiliğinden belirlenir. Hayvan yokken Algılama > **Boş arenayı kaydet** ile boş havuzu kaydedin; bu, su yüzeyindeki sabit ışık yansımalarının hayvan sanılmasını önler. Su labirenti seçildiğinde deneme süresi 60 saniyeye ayarlanır.

- **Öğrenme ve görünür platform:** hayvanın merkez noktası platform alanına girip ayarlanan süre (varsayılan 2 s) kadar kaldığında deneme kendiliğinden biter. Kaçış latansı (platforma ilk varış), platformu bulup bulmadığı, yol uzunluğu, yol verimliliği (başlangıçtan platforma düz uzaklık / yüzülen yol), hedef çeyrekte geçen süre, platforma ortalama uzaklık, duvar kenarında geçen süre (tigmotaksi) ve yüzme hızı verilir. Süre dolduğunda platform bulunamamışsa kaçış latansı deneme süresi olarak yazılır.
- **Prob testi:** hedef ve karşı çeyrekte geçen süre yüzdesi, platform yerinden geçiş sayısı, platform yerine ilk varış süresi ve platforma ortalama uzaklık verilir. Platform yeri geçişleri için bölge geçiş süresi uygulanmaz.

Excel dosyasının *Tek satır* sayfasında “Hedef çeyrek” ve “Karşı çeyrek” sütunları her hayvanda aynı adla yer alır; platformun yeri gruplar arasında farklı olsa bile sonuçlar alt alta yapıştırılabilir.

## 8. MPG, AVI ve diğer video biçimleri

Tarayıcılar MP4 (H.264), MOV ve WebM videolarını doğrudan açar. MPG/MPEG (MPEG-1/2), VOB, AVI, WMV, FLV, TS/MTS gibi biçimler seçildiğinde uygulama **MP4'e dönüştür ve aç** düğmesini gösterir. Dönüştürme tamamen cihazda, ffmpeg.wasm ile yapılır; video hiçbir yere gönderilmez. Dönüştürücü (yaklaşık 32 MB) ilk kullanımda jsDelivr'den indirilir ve tarayıcı önbelleğinde kalır, bu yüzden ilk dönüştürmede internet gerekir. Geçmeli (interlaced) DVR/DVD kayıtları otomatik olarak düzeltilir ve görüntü en çok 960 piksel genişliğe indirilir. Bilgisayarda 1 dakikalık standart çözünürlüklü video yaklaşık yarım dakikada dönüşür; telefonda daha yavaştır. Dönüşen dosya **Dönüştürülen videoyu kaydet** ile saklanırsa aynı video tekrar analiz edilirken yeniden dönüştürmek gerekmez.

ffmpeg.wasm (@ffmpeg/core 0.12.10) GPL-2.0-or-later lisanslıdır; uygulama onu yalnızca çalışma anında CDN'den yükler. Kaynak kodu: https://github.com/ffmpegwasm/ffmpeg.wasm

### Analiz hızı

Videodan analizde hız seçeneği bir üst sınırdır. Tarayıcı saniyede ekranın yenilenme sayısı kadar (çoğunlukla 60) kare verebildiği ve yoğun cihaz ayrıca kare kaçırabildiği için, uygulama hızı her kare işlenecek şekilde kendisi ayarlar: kare kaçmadıkça hızlanır, kaçtığı anda yavaşlar. Analiz bitince ortalama hız ve atlanan kare oranı gösterilir ve Excel/CSV özetine yazılır; oran %1'in üstündeyse analiz daha düşük hız sınırıyla tekrarlanmalıdır. Yumuşatma da kare sayısı yerine süreye göre uygulanır, böylece aynı video hangi hızda analiz edilirse edilsin aynı sonucu verir.

## 9. İnternetsiz tek dosya sürümü (bilgisayarlar için)

`wisetrack.html` ayrı olarak da verilir: bilgisayara indirip çift tıklayınca Chrome ya da Edge'de açılır; kurulum, internet ve hesap gerekmez. Kamera, video analizi ve Excel dahil her şey çalışır; yalnızca uygulama içi yansıtma bu sürümde kapalıdır ve MPG gibi biçimlerin dönüştürülmesi için internet gerekir. Telefonlarda indirilen HTML dosyaları güvenilir biçimde açılmadığı için telefonda web adresi + ana ekrana ekle yolunu kullanın.

## 10. Kendi sinyal sunucunuz (isteğe bağlı)

Genel PeerJS sunucusu erişilemezse ya da kurum içinde kalmak isterseniz, ağdaki bir bilgisayarda `npx peer --port 9000` çalıştırıp her iki sayfayı `?ps=SUNUCU_IP:9000` ekiyle açabilirsiniz (https yoksa `&pss=0` de ekleyin).

## Sonraki adım: yerel uygulama

Bu kod tabanı Capacitor ile Android (APK) ve iOS (Xcode projesi) olarak paketlenecek. Yerel sürüm; iPhone'da pozlama/odak kilidi, arka planda kesintisiz kayıt ve daha yüksek kare hızı ekleyecek.
