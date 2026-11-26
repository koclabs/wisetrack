# WiseTrack · telefon ve izleme ekranı sürümü

[English](README.md) · **Türkçe** · [Español](README.es.md) · [العربية](README.ar.md) · [Русский](README.ru.md) · [中文](README.zh.md) · [日本語](README.ja.md) · [한국어](README.ko.md)

Bu klasör, WiseTrack'in telefonda uygulama gibi çalışan web sürümüdür (PWA). Aynı dosyalar iPhone'da, Android'de, tablette ve bilgisayarda çalışır.

| Dosya | Görevi |
|---|---|
| `index.html` | Ölçümü yapan uygulama (telefonda açılır) |
| `izle.html` | İzleme ekranı: PC, TV tarayıcısı ya da tablette açılır, telefonun görüntüsünü ve sonuçlarını canlı gösterir |
| `sw.js`, `*.webmanifest`, `icons/` | Uygulama olarak kurulum ve çevrimdışı çalışma |
| `vendor/` | Yansıtma (PeerJS, MIT) ve QR kod (qrcode-generator, MIT) kütüphaneleri |
| `i18n/` | Arayüz çevirileri (İngilizce, İspanyolca, Arapça, Rusça, Çince, Japonca, Korece) |

**Desteklenen arayüz dilleri:** Türkçe, English, Español, العربية, Русский, 中文, 日本語, 한국어. Dil, üst çubuktaki menüden seçilir; ayrıntılar [Arayüz dili](#arayüz-dili) bölümündedir.

## Sürümler ve atıf

Makalede analiz edilen sürüm (v10) Zenodo'da arşivlenmiştir (DOI [10.5281/zenodo.24535051](https://doi.org/10.5281/zenodo.24535051), commit [`0704db8`](https://github.com/koclabs/wisetrack/tree/0704db8)). Sonraki sürümler otomatik kalibrasyon ve kamera düzeltmeleri (v11), toplu video analizi (v12) ve ek arayüz dilleri (v13) içerir. Makaledeki analizleri yeniden üretmek için arşivlenmiş sürümü kullanın.

WiseTrack MIT lisansıyla yayımlanır (`LICENSE`). Atıf bilgileri `CITATION.cff` dosyasındadır.

## 1. Yayına alma (bir kez, ~5 dakika)

Telefon tarayıcıları kamerayı yalnızca **https://** adreslerinde açar. Dosyaları doğrudan telefona kopyalamak işe yaramaz; ücretsiz bir https adresine koymanız gerekir.

**GitHub Pages (önerilen, kalıcı ve ücretsiz)**
1. github.com'da ücretsiz hesap açın, **New repository** ile örneğin `wisetrack` adlı *public* bir depo oluşturun.
2. **Add file → Upload files** ile bu klasörün *içindekileri* (index.html en üst düzeyde olacak şekilde) sürükleyip **Commit** deyin.
3. **Settings → Pages → Branch: main / (root) → Save**. Bir iki dakika sonra adresiniz `https://KULLANICIADI.github.io/wisetrack/` olur.

Alternatif: Netlify Drop (app.netlify.com/drop) sayfasına klasörü sürükleyip bırakmak da https adresi verir; kalıcı olması için ücretsiz hesapla sahiplenmeniz gerekir.

Güncelleme yaptığınızda dosyaları yeniden yükleyin ve `sw.js` içindeki `VERSION` değerini artırın (ör. `wisetrack-v13`ten `wisetrack-v14`e); telefonlar yeni sürümü bir sonraki açılışta alır.

## 2. Telefona kurulum

- **iPhone / iPad:** Adresi **Safari**'de açın → Paylaş simgesi → **Ana Ekrana Ekle**. İlk açılışta kamera iznine “İzin Ver” deyin.
- **Android:** Adresi **Chrome**'da açın → menü (⋮) → **Uygulamayı yükle** (ya da “Ana ekrana ekle”).

Kurulduktan sonra ölçüm internetsiz de çalışır. Yansıtma için internet gerekir.

## 3. Ölçüm için telefon düzeni

- Telefonu arenanın **tam üstüne**, bir tripod ya da tutucuyla sabitleyin; deney boyunca oynamamalı ve döndürülmemeli.
- **Ana (1×) arka kamerayı** kullanın. Ultra geniş (0,5×) lens ya da geniş açılı web kamerası kenarları büker; bu bükülme aşağıdaki **Arenadan lens bükülmesini ölç** ile düzeltilebilir, ama ana kamera yine de en temiz görüntüyü verir.
- Işığı ayarladıktan sonra **Pozlama ve odağı kilitle**ye dokunun (Android'de çalışır; iPhone tarayıcısı buna izin vermez, sabit ve homojen ışık kullanın).
- Uzun oturumlarda telefonu şarja takın. Ekran uygulama açıkken kapanmaz; uygulamadan çıkarsanız oturum güvenlik için duraklatılır.

### Otomatik kalibrasyon ve kamera düzeltmeleri

Kurulum > Test düzeneği ve kalibrasyon kartında:

- **Arenayı otomatik bul**: arena boşken dokunun. Uygulama zemini görüntünün ortasından başlayarak ayırır, arenanın bilinen şeklini (kare, daire ya da artı) kenarlara alt piksel doğrulukla oturtur ve noktaları yerleştirir. Daire arenalarda (havuz, Barnes) kamera eğikse dairenin merkezi elipsin merkezinde görünmez; uygulama bunu kamera geometrisinden hesaplar. Artı labirentte kapalı kollar duvarlarından tanınır; emin olunamazsa **Kolları değiştir** ile düzeltin. Duvarlar zeminle aynı renkteyse noktalar duvar üstüne oturabilir; uygulama bunu fark ederse uyarır.
- **Kalibrasyonu denetle**: görüntüdeki arena kenarının modelden ortalama kaç cm saptığını gösterir (≤0,5 cm iyi, >1,5 cm noktaları kontrol edin). Bu değer her denemenin başında kendiliğinden ölçülür ve Excel/CSV özetine yazılır.
- **Hayvan yüksekliği düzeltmesi** (Kamera, lens ve hayvan yüksekliği bölümü): kamera hayvanın sırtını görür, zemindeki yerini değil. Kamera yüksekliği ve konumu arena noktalarından tahmin edilir (ölçtüyseniz girin) ve takip noktası zemine izdüşürülür. Düzeltme yapılmazsa kamera tam tepede olsa bile kenarlardaki konumlar dışa kayar ve toplam mesafe yaklaşık hayvan yüksekliği / (kamera yüksekliği − hayvan yüksekliği) oranında fazla çıkar (sıçan, 75 cm kamera: ≈ %5,6).
- **Arenadan lens bükülmesini ölç**: satranç tahtası gerekmez; arenanın düz kenarlarının (daire arenada çemberin) düz/elips olmasını sağlayan bükülme katsayısı bulunur.
- **Kamera kaymasını izle** (varsayılan açık): deneme sırasında kamera ya da telefon çarpılıp kayarsa arena kenarı ilk kareyle her saniye karşılaştırılır; kayma bulunursa noktalar ve boş arena referansı birlikte kaydırılır, olay özete yazılır.
- Sonuçlarda, hayvanın görünür boyutu arenanın bir yanından öbürüne belirgin biçimde değişirse (kamera eğik ya da noktalar kaymış) uyarı çıkar.

Sentetik videolarla doğrulama (bilinen kamera konumu, lens bükülmesi ve sıçan boyutu, 4 cm takip yüksekliği): 18° eğik kamera ve belirgin bükülmede noktalar elle tam doğru konsa bile düzeltmesiz konum hatası ortanca 1,3 cm, %95'lik 3,1 cm ve mesafe %9,8 fazlaydı; otomatik kalibrasyon + lens + yükseklik düzeltmesiyle ortanca 0,16 cm, %95'lik 0,8 cm ve mesafe farkı %0,2 oldu. 80° geniş açılı kamerada 1,9 → 0,2 cm, havuzda (220 cm yükseklik) 0,34 → 0,26 cm, Barnes'ta 1,6 → 0,2 cm. Deneme ortasında 2 cm'lik kamera kaymasında düzeltmesiz ortanca hata 1,7 cm, kayma izlemeyle 0,15 cm.

### Arayüz dili

Üst çubuktaki dil menüsünden Türkçe, English, Español, العربية, Русский, 中文, 日本語 ve 한국어 seçilebilir. İlk açılışta tarayıcının dili kullanılır (desteklenmiyorsa İngilizce); seçim cihazda hatırlanır. Dil değişince sayfa yeniden yüklenir. Bağlantıya `?lang=en` gibi bir ek koyarak belirli bir dille açtırabilirsiniz. Excel/CSV başlıkları, bölge adları ve görüntüdeki yön harfleri de seçilen dilde yazılır; Arapça arayüz sağdan sola düzenlenir. Çeviriler `i18n/` klasöründedir (anahtarlar Türkçe metinlerdir).

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

**Hayvanla aynı renkte objeler.** Uygulama objenin kendisini hayvan sanmaması için üç önlem alır: (1) canlı kamerada “Hayvan arenada algılanınca başlat” açıkken Başlat'a basıldığında boş arena (objeler son yerlerindeyken) kendiliğinden yeniden kaydedilir; bu sırada ekranda “Boş arena kaydediliyor, hayvanı henüz koymayın” yazar. (2) Ardından her obje kontrol edilir; boş arenaya rağmen hâlâ hayvan gibi görünen bir obje (örneğin referans kaydedildikten sonra yeri değişmişse ya da videoda referans yoksa) o deneme için hayvan algılamasından çıkarılır, ekranda uyarı çıkar ve Excel özetine yazılır. (3) Tamamen bir objenin üzerinde kalan bir leke, hayvan az önce oradaysa (tırmanma) dışında, hiçbir zaman hayvan olarak seçilmez. Algılamadan çıkarılan objede tırmanma ayırt edilemez ve objenin 0,5 cm yakınındaki burun ucu görünmez; keşif süresi bu nedenle biraz düşük çıkabilir. Kurulum'daki “Obje alanlarını hayvan algılamasından her zaman çıkar” seçeneği aynı çıkarmayı her denemede uygular.

## 7. Morris su labirenti (MWM)

Kurulum > Test düzeneği'nde **Su labirenti**'ni seçin, havuz ve platform çapını girin, aşamayı (Öğrenme / Prob testi / Görünür platform) ve başlangıç noktasını seçin. Görüntüdeki K, D, G, B noktalarını havuz kenarındaki kuzey, doğu, güney ve batı işaretlerine sürükleyin; platformu görüntüde sürükleyerek gerçek yerine koyun. Hedef ve karşı çeyrek platformun konumundan kendiliğinden belirlenir. Hayvan yokken Algılama > **Boş arenayı kaydet** ile boş havuzu kaydedin; bu, su yüzeyindeki sabit ışık yansımalarının hayvan sanılmasını önler. Su labirenti seçildiğinde deneme süresi 60 saniyeye ayarlanır.

- **Öğrenme ve görünür platform:** hayvanın merkez noktası platform alanına girip ayarlanan süre (varsayılan 2 s) kadar kaldığında deneme kendiliğinden biter. Kaçış latansı (platforma ilk varış), platformu bulup bulmadığı, yol uzunluğu, yol verimliliği (başlangıçtan platforma düz uzaklık / yüzülen yol), hedef çeyrekte geçen süre, platforma ortalama uzaklık, duvar kenarında geçen süre (tigmotaksi) ve yüzme hızı verilir. Süre dolduğunda platform bulunamamışsa kaçış latansı deneme süresi olarak yazılır.
- **Prob testi:** hedef ve karşı çeyrekte geçen süre yüzdesi, platform yerinden geçiş sayısı, platform yerine ilk varış süresi ve platforma ortalama uzaklık verilir. Platform yeri geçişleri için bölge geçiş süresi uygulanmaz.

Excel dosyasının *Tek satır* sayfasında “Hedef çeyrek” ve “Karşı çeyrek” sütunları her hayvanda aynı adla yer alır; platformun yeri gruplar arasında farklı olsa bile sonuçlar alt alta yapıştırılabilir.

## 8. Barnes labirenti

Kurulum > Test düzeneği'nde **Barnes labirenti**'ni seçin; platform çapını, delik sayısını, delik çapını ve delik merkezinin platform kenarına uzaklığını girin (varsayılan fare platformu: 92 cm, 20 delik, 5 cm). K, D, G, B noktalarını platform kenarına sürükleyin; **K noktası 1 numaralı deliğin hizasında** olmalıdır, delikler saat yönünde numaralanır. Çizilen delik halkası görüntüdeki deliklerle örtüşmüyorsa **Delikleri otomatik hizala**'ya dokunun ya da kaydırıcıyla döndürün. Hedef (kaçış) deliğini listeden seçin ya da görüntüde deliğe dokunun. Hayvan yokken Algılama > **Boş arenayı kaydet** ile boş platformu kaydedin; aksi hâlde koyu delikler (özellikle siyah hayvanla) hayvan sanılabilir. Barnes seçildiğinde deneme süresi 180 saniyeye ayarlanır.

- **Delik ziyareti:** hayvanın burun noktası deliğin kenarına en çok 1 cm yaklaştığında (ayarlanabilir) ziyaret sayılır. Hedef dışı her ziyaret bir hatadır; aynı deliğe tekrar ziyaret de sayılır.
- **Öğrenme:** birincil latans, birincil hata ve birincil yol (hedef deliğe ilk ziyarete kadar); toplam latans, toplam hata ve toplam yol (kaçış kutusuna girene kadar) verilir. Hayvan hedef deliğin yanında 1 saniye (ayarlanabilir) görüntüden kaybolduğunda kaçış kutusuna girmiş sayılır ve deneme biter; kaybolma anı toplam latanstır.
- **Prob testi:** hedef deliğe ve diğer deliklere ziyaret sayısı, hedef delik ziyaret oranı, hedef çeyrekte geçen süre ve birincil ölçümler verilir.
- **Arama stratejisi** otomatik önerilir: *Doğrudan* (en çok 3 hata, hepsi hedefe 2 delik mesafede), *Seri* (tek yönde ardışık en az 3 komşu delik), diğerleri *Rastgele*. Delik ziyaret sırası Excel özetine yazılır; öneri bu sıra üzerinden kontrol edilmelidir.

Excel'in *Tek satır* sayfasında delik sütunları “Delik 1 … Delik N”, çeyrekler “Hedef / Karşı / Yan” olarak adlandırılır; hedef delik hayvandan hayvana değişse de sonuçlar alt alta yapıştırılabilir.

## 9. MPG, AVI ve diğer video biçimleri

Tarayıcılar MP4 (H.264), MOV ve WebM videolarını doğrudan açar. MPG/MPEG (MPEG-1/2), VOB, AVI, WMV, FLV, TS/MTS gibi biçimler seçildiğinde uygulama **MP4'e dönüştür ve aç** düğmesini gösterir. Dönüştürme tamamen cihazda, ffmpeg.wasm ile yapılır; video hiçbir yere gönderilmez. Dönüştürücü (yaklaşık 32 MB) ilk kullanımda jsDelivr'den indirilir ve tarayıcı önbelleğinde kalır, bu yüzden ilk dönüştürmede internet gerekir. Geçmeli (interlaced) DVR/DVD kayıtları otomatik olarak düzeltilir ve görüntü en çok 960 piksel genişliğe indirilir. Bilgisayarda 1 dakikalık standart çözünürlüklü video yaklaşık yarım dakikada dönüşür; telefonda daha yavaştır. Dönüşen dosya **Dönüştürülen videoyu kaydet** ile saklanırsa aynı video tekrar analiz edilirken yeniden dönüştürmek gerekmez.

ffmpeg.wasm (@ffmpeg/core 0.12.10) GPL-2.0-or-later lisanslıdır; uygulama onu yalnızca çalışma anında CDN'den yükler. Kaynak kodu: https://github.com/ffmpegwasm/ffmpeg.wasm

### Analiz hızı

Videodan analizde hız seçeneği bir üst sınırdır. Tarayıcı saniyede ekranın yenilenme sayısı kadar (çoğunlukla 60) kare verebildiği ve yoğun cihaz ayrıca kare kaçırabildiği için, uygulama hızı her kare işlenecek şekilde kendisi ayarlar: kare kaçmadıkça hızlanır, kaçtığı anda yavaşlar. Analiz bitince ortalama hız ve atlanan kare oranı gösterilir ve Excel/CSV özetine yazılır; oran %1'in üstündeyse analiz daha düşük hız sınırıyla tekrarlanmalıdır. Yumuşatma da kare sayısı yerine süreye göre uygulanır, böylece aynı video hangi hızda analiz edilirse edilsin aynı sonucu verir.

### Toplu video analizi

Kurulum sekmesinin sonundaki **5 · Toplu video analizi** kartı aynı düzenekte çekilmiş videoları sırayla analiz eder:

1. **Video ekle** ile birden çok video seçin (bilgisayarda kartın üstüne sürükleyip de bırakabilirsiniz). Liste dosya adına göre sıralanır; hayvan kodu dosya adından gelir ve tabloda değiştirilebilir. Obje tanıma testinde her satırda yeni objeyi, su labirentinde başlangıç noktasını ayrı seçebilirsiniz.
2. **İlk videoyu kurulum için aç** ile arenayı (obje tanımada objeleri de), eşiği ve süre ayarlarını bir kez yapın.
3. Seçenekler: **Arena yerleşimi** tüm videolarda aynı olabilir ya da her videoda otomatik bulunabilir (kamera videolar arasında oynadıysa). **Boş arena referansı** varsayılan olarak her videonun kendisinden çıkarılır: videoya yayılmış 21 karede hayvan her noktada yalnızca birkaç karede bulunduğundan, her pikselin albino hayvanda 30., koyu hayvanda 70. yüzdeliği hayvansız zemini verir.
4. **Toplu analizi başlat**. MPG/AVI gibi biçimler sırası gelince kendiliğinden dönüştürülür. Açılamayan ya da hayvanın bulunamadığı videolar işaretlenip atlanır, analiz durmaz. **Durdur** ile kesilen liste **Kalanları analiz et** ile sürdürülebilir.
5. Bitince bilgisayarda **Toplu Excel** kendiliğinden iner (telefonda düğmeye dokunun). Sayfalar: *Toplu sonuçlar* (her video bir satır; tek video Excel'indeki tüm ölçütler), *Bölgeler* (uzun biçim), *Kalite* (algılanan/atlanan kare, kalibrasyon sapması, kamera kayması, uyarılar), *Ayarlar* ve isteğe bağlı *Konum kaydı*.

Analiz sırasında sekme açık ve önde kalmalıdır; tarayıcı arka plandaki sekmeye video karesi vermez. Sekme arka plana alınırsa analiz duraklar, geri dönülünce kaldığı yerden devam eder. Ekran kendiliğinden kapanmaz.

## 10. İnternetsiz tek dosya sürümü (bilgisayarlar için)

`wisetrack.html` ayrı olarak da verilir: bilgisayara indirip çift tıklayınca Chrome ya da Edge'de açılır; kurulum, internet ve hesap gerekmez. Kamera, video analizi ve Excel dahil her şey çalışır; yalnızca uygulama içi yansıtma bu sürümde kapalıdır ve MPG gibi biçimlerin dönüştürülmesi için internet gerekir. Telefonlarda indirilen HTML dosyaları güvenilir biçimde açılmadığı için telefonda web adresi + ana ekrana ekle yolunu kullanın.

## 11. Kendi sinyal sunucunuz (isteğe bağlı)

Genel PeerJS sunucusu erişilemezse ya da kurum içinde kalmak isterseniz, ağdaki bir bilgisayarda `npx peer --port 9000` çalıştırıp her iki sayfayı `?ps=SUNUCU_IP:9000` ekiyle açabilirsiniz (https yoksa `&pss=0` de ekleyin).

## Sonraki adım: yerel uygulama

Bu kod tabanı Capacitor ile Android (APK) ve iOS (Xcode projesi) olarak paketlenecek. Yerel sürüm; iPhone'da pozlama/odak kilidi, arka planda kesintisiz kayıt ve daha yüksek kare hızı ekleyecek.
