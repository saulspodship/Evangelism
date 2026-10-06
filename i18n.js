/* Shared language and appearance controls for the home page and field library.
   The default is English, light mode. Urdu and Hindi are intentionally handled
   on-device so the PWA remains usable offline and no page text is sent away. */
(() => {
  const storageLanguage = "sauls-podship-evangelism:language:v1";
  const storageTheme = "sauls-podship-evangelism:theme:v1";
  const normalize = (value) => String(value || "").replace(/\s+/g, " ").trim();

  const common = {
    "Skip to content": { ur: "مواد پر جائیں", hi: "सामग्री पर जाएँ" },
    "Saul's Podship": { ur: "ساؤل کا پوڈشپ", hi: "साउल्स पॉडशिप" },
    "Evangelism field guide": { ur: "انجیلی بشارت کی رہنما کتاب", hi: "सुसमाचार साझा करने की मार्गदर्शिका" },
    "The gospel": { ur: "خوشخبری", hi: "सुसमाचार" },
    "Conversations": { ur: "گفتگو", hi: "बातचीत" },
    "Questions": { ur: "سوالات", hi: "प्रश्न" },
    "Field library": { ur: "میدانی کتب خانہ", hi: "फील्ड लाइब्रेरी" },
    "Install app": { ur: "ایپ انسٹال کریں", hi: "ऐप इंस्टॉल करें" },
    "Visit the Podship": { ur: "پوڈشپ دیکھیں", hi: "पॉडशिप देखें" },
    "Dark mode": { ur: "ڈارک موڈ", hi: "डार्क मोड" },
    "Light mode": { ur: "لائٹ موڈ", hi: "लाइट मोड" },
    "English": { ur: "انگریزی", hi: "अंग्रेज़ी" },
    "Urdu": { ur: "اردو", hi: "उर्दू" },
    "Hindi": { ur: "ہندی", hi: "हिन्दी" },
    "Site preferences": { ur: "سائٹ کی ترجیحات", hi: "साइट प्राथमिकताएँ" },
    "Choose language": { ur: "زبان منتخب کریں", hi: "भाषा चुनें" },
    "Switch to dark mode": { ur: "ڈارک موڈ پر جائیں", hi: "डार्क मोड पर जाएँ" },
    "Switch to light mode": { ur: "لائٹ موڈ پر جائیں", hi: "लाइट मोड पर जाएँ" },
    "Main navigation": { ur: "مرکزی نیویگیشن", hi: "मुख्य नेविगेशन" },
    "Open navigation menu": { ur: "نیویگیشن مینو کھولیں", hi: "नेविगेशन मेनू खोलें" },
    "Close navigation menu": { ur: "نیویگیشن مینو بند کریں", hi: "नेविगेशन मेनू बंद करें" },
    "Our approach": { ur: "ہمارا طریقہ", hi: "हमारा तरीका" },
    "Install the Evangelism field guide": { ur: "انجیلی بشارت کی رہنما کتاب انسٹال کریں", hi: "सुसमाचार मार्गदर्शिका इंस्टॉल करें" },
    "Saul's Podship Evangelism, back to top": { ur: "ساؤل کے پوڈشپ کی انجیلی بشارت، اوپر واپس", hi: "साउल्स पॉडशिप सुसमाचार, ऊपर जाएँ" },
    "Jump to conversation guide": { ur: "گفتگو کی رہنما کتاب پر جائیں", hi: "बातचीत मार्गदर्शिका पर जाएँ" },
    "A sunrise over an open path, representing new life in Jesus": { ur: "کھلے راستے پر طلوع آفتاب، یسوع میں نئی زندگی کی علامت", hi: "खुले रास्ते पर सूर्योदय, यीशु में नए जीवन का प्रतीक" },
    "Two people in a gentle conversation, surrounded by listening waves": { ur: "سننے کی لہروں میں گھری دو لوگوں کی نرم گفتگو", hi: "सुनने की तरंगों से घिरी दो लोगों की सहज बातचीत" },
    "A glowing compass and connected points, representing sharing faith in everyday life": { ur: "چمکتا قطب نما اور جڑے ہوئے نقاط، روزمرہ زندگی میں ایمان بانٹنے کی علامت", hi: "चमकता कम्पास और जुड़े बिंदु, रोज़मर्रा के जीवन में विश्वास साझा करने का प्रतीक" },
    "You’re already using the Evangelism field guide as an app.": { ur: "آپ پہلے ہی انجیلی بشارت کی رہنما کتاب کو ایپ کے طور پر استعمال کر رہے ہیں۔", hi: "आप पहले से ही सुसमाचार मार्गदर्शिका को ऐप के रूप में उपयोग कर रहे हैं।" },
    "Evangelism is being added to your device.": { ur: "انجیلی بشارت آپ کے آلے میں شامل کی جا رہی ہے۔", hi: "सुसमाचार मार्गदर्शिका आपके डिवाइस में जोड़ी जा रही है।" },
    "No problem—you can install it any time from your browser menu.": { ur: "کوئی مسئلہ نہیں—آپ اسے براؤزر مینو سے کسی بھی وقت انسٹال کر سکتے ہیں۔", hi: "कोई बात नहीं—आप इसे ब्राउज़र मेनू से कभी भी इंस्टॉल कर सकते हैं।" },
    "To install: tap Share in Safari, then choose “Add to Home Screen.”": { ur: "انسٹال کرنے کے لیے: سفاری میں شیئر دبائیں، پھر “Add to Home Screen” منتخب کریں۔", hi: "इंस्टॉल करने के लिए: सफारी में Share दबाएँ, फिर “Add to Home Screen” चुनें।" },
    "This guide is ready to install. Open your browser menu and choose “Install app” or “Add to Home Screen.”": { ur: "یہ رہنما کتاب انسٹال ہونے کے لیے تیار ہے۔ براؤزر مینو کھولیں اور “Install app” یا “Add to Home Screen” منتخب کریں۔", hi: "यह मार्गदर्शिका इंस्टॉल करने के लिए तैयार है। ब्राउज़र मेनू खोलें और “Install app” या “Add to Home Screen” चुनें।" },
    "Evangelism has been installed. Carry the guide with you.": { ur: "انجیلی بشارت انسٹال ہو گئی ہے۔ رہنما کتاب اپنے ساتھ لے جائیں۔", hi: "सुसमाचार मार्गदर्शिका इंस्टॉल हो गई है। इसे अपने साथ लेकर चलें।" },
    "A SCRIPTURE-ROOTED FIELD GUIDE": { ur: "کتابِ مقدس پر مبنی رہنما کتاب", hi: "पवित्रशास्त्र पर आधारित मार्गदर्शिका" },
    "Carry the good news.": { ur: "خوشخبری اپنے ساتھ لے جائیں۔", hi: "सुसमाचार अपने साथ लेकर चलें।" },
    "Share it with grace.": { ur: "فضل کے ساتھ اسے بانٹیں۔", hi: "अनुग्रह के साथ इसे साझा करें।" },
    "A clear, thoughtful guide for talking about Jesus—with honesty, courage, and room for real questions.": { ur: "یسوع کے بارے میں ایمانداری، حوصلے اور حقیقی سوالات کے لیے جگہ کے ساتھ بات کرنے کی واضح اور سنجیدہ رہنما کتاب۔", hi: "यीशु के बारे में ईमानदारी, साहस और सच्चे सवालों के लिए जगह के साथ बात करने की स्पष्ट और विचारशील मार्गदर्शिका।" },
    "Start with the gospel": { ur: "خوشخبری سے شروع کریں", hi: "सुसमाचार से शुरू करें" },
    "How to use this guide": { ur: "اس رہنما کتاب کو کیسے استعمال کریں", hi: "इस मार्गदर्शिका का उपयोग कैसे करें" },
    "Rooted in Scripture": { ur: "کتابِ مقدس میں جڑی ہوئی", hi: "पवित्रशास्त्र में जड़ी हुई" },
    "Shared with humility": { ur: "فروتنی کے ساتھ بانٹی گئی", hi: "नम्रता के साथ साझा की गई" },
    "A product of": { ur: "پیشکش", hi: "प्रस्तुति" },
    "THE INVITATION": { ur: "دعوت", hi: "आमंत्रण" },
    "FIELD NOTES / 01—04": { ur: "میدانی نوٹس / 01—04", hi: "फील्ड नोट्स / 01—04" },
    "THE WAY OF JESUS": { ur: "یسوع کی راہ", hi: "यीशु का मार्ग" },
    "“I am the way, and the truth, and the life.”": { ur: "“راہ، حق اور زندگی میں ہوں۔”", hi: "“मार्ग, सत्य और जीवन मैं हूँ।”" },
    "From the Saul's Podship visual archive": { ur: "ساؤل کے پوڈشپ کے بصری ذخیرے سے", hi: "साउल्स पॉडशिप के दृश्य संग्रह से" },
    "Not a script to recite. A truth to share with love.": { ur: "یہ رٹنے کا اسکرپٹ نہیں، محبت کے ساتھ بانٹنے والی سچائی ہے۔", hi: "यह रटने की पटकथा नहीं, प्रेम के साथ साझा किया जाने वाला सत्य है।" },
    "Explore the guide": { ur: "رہنما کتاب دیکھیں", hi: "मार्गदर्शिका देखें" },
    "A SIMPLE AIM": { ur: "ایک سادہ مقصد", hi: "एक सरल उद्देश्य" },
    "Make Jesus known.": { ur: "یسوع کو معروف کریں۔", hi: "यीशु को जानने योग्य बनाएँ।" },
    "Keep love at the center.": { ur: "محبت کو مرکز میں رکھیں۔", hi: "प्रेम को केंद्र में रखें।" },
    "Listen generously. Speak clearly. Trust God with the outcome.": { ur: "دل کھول کر سنیں۔ صاف بولیں۔ نتیجہ خدا پر چھوڑ دیں۔", hi: "उदारता से सुनें। स्पष्ट बोलें। परिणाम परमेश्वर पर छोड़ दें।" },
    "VISUAL FIELD NOTES": { ur: "بصری میدانی نوٹس", hi: "दृश्य फील्ड नोट्स" },
    "See the story.": { ur: "کہانی دیکھیں۔", hi: "कहानी देखें।" },
    "Carry the light.": { ur: "روشنی لے جائیں۔", hi: "ज्योति लेकर चलें।" },
    "A visual way to remember the practice: receive the good news, make space for a real conversation, and carry hope into everyday places.": { ur: "اس عمل کو یاد رکھنے کا بصری طریقہ: خوشخبری قبول کریں، حقیقی گفتگو کے لیے جگہ بنائیں، اور روزمرہ کی جگہوں میں امید لے جائیں۔", hi: "इस अभ्यास को याद रखने का दृश्य तरीका: सुसमाचार ग्रहण करें, सच्ची बातचीत के लिए जगह बनाएँ और रोज़मर्रा की जगहों में आशा लेकर जाएँ।" },
    "Receive the good news": { ur: "خوشخبری قبول کریں", hi: "सुसमाचार ग्रहण करें" },
    "The gospel begins with God's welcome: dignity, rescue, grace, and a new way of life.": { ur: "خوشخبری خدا کے استقبال سے شروع ہوتی ہے: عزت، نجات، فضل اور زندگی کی نئی راہ۔", hi: "सुसमाचार परमेश्वर के स्वागत से शुरू होता है: गरिमा, उद्धार, अनुग्रह और जीवन की नई राह।" },
    "Make room to listen": { ur: "سننے کے لیے جگہ بنائیں", hi: "सुनने के लिए जगह बनाएँ" },
    "People are not projects. Questions, patience, and mutual respect open honest conversations about Jesus.": { ur: "لوگ منصوبے نہیں ہیں۔ سوالات، صبر اور باہمی احترام یسوع کے بارے میں ایماندار گفتگو کا دروازہ کھولتے ہیں۔", hi: "लोग परियोजनाएँ नहीं हैं। प्रश्न, धैर्य और पारस्परिक सम्मान यीशु के बारे में ईमानदार बातचीत का द्वार खोलते हैं।" },
    "Carry hope outward": { ur: "امید باہر لے جائیں", hi: "आशा को बाहर ले जाएँ" },
    "Share your faith in homes, churches, campuses, and digital spaces—with courage shaped by love.": { ur: "اپنا ایمان گھروں، کلیسیاؤں، کیمپسز اور ڈیجیٹل جگہوں میں بانٹیں—محبت سے ڈھلے ہوئے حوصلے کے ساتھ۔", hi: "अपने विश्वास को घरों, चर्चों, कैंपसों और डिजिटल स्थानों में साझा करें—प्रेम से ढले साहस के साथ।" },
    "THE HEART OF THE MESSAGE": { ur: "پیغام کا دل", hi: "संदेश का हृदय" },
    "Good news, in": { ur: "خوشخبری،", hi: "सुसमाचार," },
    "four movements.": { ur: "چار مراحل میں۔", hi: "चार चरणों में।" },
    "Evangelism begins with God's story—not a sales pitch. Here is the hope at the centre of the Christian faith.": { ur: "انجیلی بشارت خدا کی کہانی سے شروع ہوتی ہے، کسی فروخت کی پیشکش سے نہیں۔ یہاں مسیحی ایمان کے مرکز کی امید ہے۔", hi: "सुसमाचार सुनाना परमेश्वर की कहानी से शुरू होता है, किसी बिक्री-प्रस्ताव से नहीं। यहाँ मसीही विश्वास के केंद्र की आशा है।" },
    "Made for life": { ur: "خدا کے ساتھ زندگی کے لیے بنائے گئے", hi: "परमेश्वर के साथ जीवन के लिए बनाए गए" },
    "with God": { ur: "خدا کے ساتھ", hi: "परमेश्वर के साथ" },
    "Every person carries God-given dignity. We were made for relationship with our Creator and with one another.": { ur: "ہر شخص خدا کی دی ہوئی عزت رکھتا ہے۔ ہمیں اپنے خالق اور ایک دوسرے کے ساتھ رفاقت کے لیے بنایا گیا ہے۔", hi: "हर व्यक्ति परमेश्वर से मिली गरिमा रखता है। हमें अपने सृष्टिकर्ता और एक-दूसरे के साथ संबंध के लिए बनाया गया है।" },
    "The fracture": { ur: "گناہ کی دراڑ", hi: "पाप की दरार" },
    "of sin": { ur: "گناہ کی", hi: "पाप की" },
    "We all turn from God's good way. Sin breaks our relationship with God and one another; no effort can heal that divide.": { ur: "ہم سب خدا کی اچھی راہ سے منہ موڑتے ہیں۔ گناہ خدا اور ایک دوسرے کے ساتھ رشتے کو توڑ دیتا ہے؛ کوئی انسانی کوشش اس دراڑ کو نہیں بھر سکتی۔", hi: "हम सब परमेश्वर की अच्छी राह से मुड़ जाते हैं। पाप परमेश्वर और एक-दूसरे के साथ हमारे संबंध को तोड़ देता है; कोई प्रयास उस दरार को नहीं भर सकता।" },
    "Jesus brings": { ur: "یسوع نجات", hi: "यीशु उद्धार" },
    "rescue": { ur: "لاتا ہے", hi: "लाते हैं" },
    "Jesus died for our sins and was raised. In him, forgiveness and new life are offered as a gift—not earned.": { ur: "یسوع ہمارے گناہوں کے لیے مرا اور زندہ کیا گیا۔ اس میں معافی اور نئی زندگی تحفے کے طور پر ملتی ہے، کمائی نہیں جاتی۔", hi: "यीशु हमारे पापों के लिए मरे और जिलाए गए। उनमें क्षमा और नया जीवन उपहार के रूप में मिलता है, कमाया नहीं जाता।" },
    "Respond with": { ur: "اعتماد کے ساتھ", hi: "विश्वास के साथ" },
    "trust": { ur: "جواب دیں", hi: "उत्तर दें" },
    "Receive God's grace by faith and begin a life of following Jesus in the company of his people.": { ur: "ایمان سے خدا کا فضل قبول کریں اور یسوع کے لوگوں کے ساتھ اس کی پیروی کی زندگی شروع کریں۔", hi: "विश्वास से परमेश्वर का अनुग्रह ग्रहण करें और यीशु के लोगों के साथ उसका अनुसरण करने का जीवन शुरू करें।" },
    "THE GOOD NEWS AT ITS CENTRE": { ur: "خوشخبری کا مرکز", hi: "सुसमाचार का केंद्र" },
    "Jesus died for our sins, was buried, and was raised on the third day.": { ur: "یسوع ہمارے گناہوں کے لیے مرا، دفن ہوا اور تیسرے دن زندہ کیا گیا۔", hi: "यीशु हमारे पापों के लिए मरे, दफनाए गए और तीसरे दिन जिलाए गए।" },
    "Sharing the gospel is an invitation, never a reason to pressure or diminish another person.": { ur: "خوشخبری بانٹنا دعوت ہے، کسی پر دباؤ ڈالنے یا اسے کم تر سمجھنے کی وجہ کبھی نہیں۔", hi: "सुसमाचार साझा करना आमंत्रण है, किसी पर दबाव डालने या उसे छोटा समझने का कारण कभी नहीं।" },
    "THE CONVERSATION": { ur: "گفتگو", hi: "बातचीत" },
    "Begin with": { ur: "آغاز کریں", hi: "शुरुआत करें" },
    "listening.": { ur: "سننے سے۔", hi: "सुनने से।" },
    "People are not projects. A thoughtful question and an unhurried ear often open the door to an honest conversation.": { ur: "لوگ منصوبے نہیں ہیں۔ ایک سوچا سمجھا سوال اور اطمینان سے سننے والا کان اکثر ایماندار گفتگو کا دروازہ کھول دیتا ہے۔", hi: "लोग परियोजनाएँ नहीं हैं। एक विचारशील प्रश्न और धैर्य से सुनने वाला कान अक्सर ईमानदार बातचीत का द्वार खोल देता है।" },
    "Ask permission.": { ur: "اجازت مانگیں۔", hi: "अनुमति माँगें।" },
    "“Would you be open to talking about faith?”": { ur: "“کیا آپ ایمان کے بارے میں بات کرنے کے لیے تیار ہوں گے؟”", hi: "“क्या आप विश्वास के बारे में बात करने के लिए तैयार होंगे?”" },
    "Listen before you answer.": { ur: "جواب دینے سے پہلے سنیں۔", hi: "उत्तर देने से पहले सुनें।" },
    "Let their story shape where you go next.": { ur: "ان کی کہانی طے کرے کہ گفتگو آگے کہاں جائے۔", hi: "उनकी कहानी तय करे कि बातचीत आगे कहाँ जाए।" },
    "Speak simply.": { ur: "سادگی سے بولیں۔", hi: "सरलता से बोलें।" },
    "Share hope without forcing a response.": { ur: "جواب پر مجبور کیے بغیر امید بانٹیں۔", hi: "उत्तर के लिए दबाव डाले बिना आशा साझा करें।" },
    "“Always be prepared to give an answer ... but do this with gentleness and respect.”": { ur: "“جواب دینے کے لیے ہمیشہ تیار رہیں، مگر حلیمی اور احترام کے ساتھ۔”", hi: "“उत्तर देने के लिए हमेशा तैयार रहें, पर नम्रता और आदर के साथ।”" },
    "A CONVERSATION STARTER": { ur: "گفتگو کا آغاز", hi: "बातचीत की शुरुआत" },
    "YOUR STORY": { ur: "آپ کی کہانی", hi: "आपकी कहानी" },
    "Make it personal, not a performance.": { ur: "اسے ذاتی رکھیں، نمائش نہ بنائیں۔", hi: "इसे व्यक्तिगत रखें, प्रदर्शन नहीं।" },
    "A simple invitation makes space for honesty—yours and theirs.": { ur: "سادہ دعوت آپ کی اور ان کی ایمانداری کے لیے جگہ بناتی ہے۔", hi: "एक सरल निमंत्रण आपकी और उनकी ईमानदारी के लिए जगह बनाता है।" },
    "“Would you be open to hearing what following Jesus has meant in my life?”": { ur: "“کیا آپ سننا چاہیں گے کہ یسوع کی پیروی میری زندگی میں کیا معنی رکھتی ہے؟”", hi: "“क्या आप सुनना चाहेंगे कि यीशु का अनुसरण मेरी ज़िंदगी में क्या मायने रखता है?”" },
    "Story": { ur: "کہانی", hi: "कहानी" },
    "Meaning": { ur: "معنی", hi: "अर्थ" },
    "Questions": { ur: "سوالات", hi: "प्रश्न" },
    "Prayer": { ur: "دعا", hi: "प्रार्थना" },
    "Choose a theme, then move through the prompts at your own pace.": { ur: "ایک موضوع چنیں، پھر اپنی رفتار سے سوالات دیکھیں۔", hi: "एक विषय चुनें और अपनी गति से प्रश्नों के साथ आगे बढ़ें।" },
    "Share what": { ur: "جو آپ نے", hi: "जो आपने" },
    "you’ve": { ur: "پایا ہے وہ", hi: "पाया है उसे" },
    "received.": { ur: "بانٹیں۔", hi: "साझा करें।" },
    "You don’t have to know every answer. A brief personal story can make the hope of Jesus feel concrete—especially when you leave room for someone else’s story, too.": { ur: "آپ کو ہر جواب معلوم ہونا ضروری نہیں۔ مختصر ذاتی کہانی یسوع کی امید کو حقیقی بنا سکتی ہے، خاص طور پر جب آپ دوسرے کی کہانی کے لیے بھی جگہ چھوڑیں۔", hi: "आपको हर उत्तर जानना ज़रूरी नहीं। छोटी व्यक्तिगत कहानी यीशु की आशा को वास्तविक बना सकती है, खासकर जब आप दूसरे की कहानी के लिए भी जगह छोड़ें।" },
    "Before": { ur: "پہلے", hi: "पहले" },
    "What were you longing for?": { ur: "آپ کس چیز کے مشتاق تھے؟", hi: "आप किसकी लालसा रखते थे?" },
    "Turning point": { ur: "بدلاؤ کا لمحہ", hi: "बदलाव का मोड़" },
    "What helped you see Jesus differently?": { ur: "کس چیز نے آپ کو یسوع کو نئے انداز سے دیکھنے میں مدد دی؟", hi: "किस बात ने आपको यीशु को अलग तरह से देखने में मदद की?" },
    "Today": { ur: "آج", hi: "आज" },
    "What is changing as you follow him?": { ur: "اس کی پیروی کرتے ہوئے آپ میں کیا بدل رہا ہے؟", hi: "उसका अनुसरण करते हुए आपमें क्या बदल रहा है?" },
    "A PRIVATE WRITING PROMPT": { ur: "ذاتی تحریری سوال", hi: "निजी लेखन संकेत" },
    "Shape a 60-second story": { ur: "ساٹھ سیکنڈ کی کہانی بنائیں", hi: "60 सेकंड की कहानी बनाएँ" },
    "Nothing you write here is uploaded or sent.": { ur: "آپ یہاں جو لکھتے ہیں وہ اپ لوڈ یا بھیجا نہیں جاتا۔", hi: "आप यहाँ जो लिखते हैं वह अपलोड या भेजा नहीं जाता।" },
    "YOUR STORY, AT A GLANCE": { ur: "آپ کی کہانی ایک نظر میں", hi: "आपकी कहानी एक नज़र में" },
    "Add a few notes above to see your outline here.": { ur: "اپنا خاکہ دیکھنے کے لیے اوپر چند نوٹس لکھیں۔", hi: "अपनी रूपरेखा देखने के लिए ऊपर कुछ नोट लिखें।" },
    "Copy outline": { ur: "خاکہ نقل کریں", hi: "रूपरेखा कॉपी करें" },
    "Clear draft": { ur: "مسودہ صاف کریں", hi: "मसौदा साफ़ करें" },
    "WHEN QUESTIONS COME": { ur: "جب سوالات آئیں", hi: "जब प्रश्न आएँ" },
    "Questions about": { ur: "انجیلی بشارت کے", hi: "सुसमाचार प्रचार के" },
    "evangelism.": { ur: "سوالات۔", hi: "प्रश्न।" },
    "Faith-filled conversations can include honest doubt. Find clear, Scripture-rooted answers to common questions about sharing the gospel, Christian evangelism, respectful dialogue, and reaching Gen Z.": { ur: "ایمان کی گفتگو میں ایماندار شک بھی شامل ہو سکتا ہے۔ خوشخبری بانٹنے، مسیحی انجیلی بشارت، بااحترام مکالمے اور Gen Z تک پہنچنے کے عام سوالات کے واضح، کتابِ مقدس پر مبنی جواب پائیں۔", hi: "विश्वास की बातचीत में ईमानदार संदेह भी हो सकता है। सुसमाचार साझा करने, मसीही सुसमाचार प्रचार, सम्मानपूर्ण संवाद और Gen Z तक पहुँचने के सामान्य प्रश्नों के स्पष्ट, पवित्रशास्त्र-आधारित उत्तर पाएँ।" },
    "SHORT ANSWER": { ur: "مختصر جواب", hi: "संक्षिप्त उत्तर" },
    "Christian evangelism is sharing the good news of Jesus with clarity, humility, and love—an invitation, never pressure.": { ur: "مسیحی انجیلی بشارت یسوع کی خوشخبری کو وضاحت، فروتنی اور محبت کے ساتھ بانٹنا ہے—یہ دعوت ہے، دباؤ کبھی نہیں۔", hi: "मसीही सुसमाचार प्रचार यीशु के शुभ समाचार को स्पष्टता, नम्रता और प्रेम के साथ साझा करना है—यह आमंत्रण है, दबाव कभी नहीं।" },
    "Explore the theological archive": { ur: "علم الٰہیات کا ذخیرہ دیکھیں", hi: "धर्मशास्त्रीय संग्रह देखें" },
    "“I’m not religious. Where do I begin?”": { ur: "“میں مذہبی نہیں ہوں، کہاں سے شروع کروں؟”", hi: "“मैं धार्मिक नहीं हूँ। कहाँ से शुरू करूँ?”" },
    "“What if I don’t know the answer?”": { ur: "“اگر مجھے جواب معلوم نہ ہو تو؟”", hi: "“अगर मुझे उत्तर न पता हो तो?”" },
    "It’s okay to say, “I don’t know, but I’d like to explore that with you.” Honest humility builds trust. The aim is not to win a debate; it is to point toward Jesus faithfully.": { ur: "یہ کہنا ٹھیک ہے، “مجھے معلوم نہیں، مگر میں آپ کے ساتھ اسے سمجھنا چاہوں گا۔” ایماندار فروتنی اعتماد بناتی ہے۔ مقصد بحث جیتنا نہیں بلکہ وفاداری سے یسوع کی طرف اشارہ کرنا ہے۔", hi: "यह कहना ठीक है, “मुझे नहीं पता, पर मैं आपके साथ इसे समझना चाहूँगा।” ईमानदार नम्रता विश्वास बनाती है। उद्देश्य बहस जीतना नहीं, बल्कि विश्वासयोग्यता से यीशु की ओर संकेत करना है।" },
    "“What if they say no?”": { ur: "“اگر وہ انکار کر دیں تو؟”", hi: "“अगर वे मना कर दें तो?”" },
    "Respect their answer without pressure. Friendship is not a transaction. Continue to show care, and trust that the timing and outcome are not yours to control.": { ur: "بغیر دباؤ کے ان کے جواب کا احترام کریں۔ دوستی کوئی لین دین نہیں۔ خیال رکھنا جاری رکھیں اور بھروسہ کریں کہ وقت اور نتیجہ آپ کے اختیار میں نہیں۔", hi: "बिना दबाव उनके उत्तर का सम्मान करें। मित्रता कोई लेन-देन नहीं है। परवाह दिखाते रहें और भरोसा रखें कि समय और परिणाम आपके नियंत्रण में नहीं हैं।" },
    "“How do I talk with someone of another faith?”": { ur: "“میں دوسرے ایمان والے سے کیسے بات کروں؟”", hi: "“मैं दूसरे विश्वास वाले व्यक्ति से कैसे बात करूँ?”" },
    "Begin with respect. Ask about their story, represent their beliefs fairly, and explain your hope without caricature or coercion. A generous conversation makes room for both people to be heard.": { ur: "احترام سے آغاز کریں۔ ان کی کہانی پوچھیں، ان کے عقائد کو انصاف سے پیش کریں، اور تمسخر یا جبر کے بغیر اپنی امید بیان کریں۔ کشادہ گفتگو دونوں کو سنے جانے کی جگہ دیتی ہے۔", hi: "सम्मान से शुरुआत करें। उनकी कहानी पूछें, उनके विश्वास को निष्पक्षता से प्रस्तुत करें और उपहास या दबाव के बिना अपनी आशा बताएँ। उदार बातचीत दोनों लोगों को सुने जाने की जगह देती है।" },
    "“What is evangelism?”": { ur: "“انجیلی بشارت کیا ہے؟”", hi: "“सुसमाचार प्रचार क्या है?”" },
    "Evangelism is sharing the good news of Jesus with clarity, humility, and love. It is an invitation—not pressure, manipulation, or a sales pitch.": { ur: "انجیلی بشارت یسوع کی خوشخبری کو وضاحت، فروتنی اور محبت کے ساتھ بانٹنا ہے۔ یہ دعوت ہے، دباؤ، جوڑ توڑ یا فروخت کی پیشکش نہیں۔", hi: "सुसमाचार प्रचार यीशु के शुभ समाचार को स्पष्टता, नम्रता और प्रेम के साथ साझा करना है। यह आमंत्रण है, दबाव, हेरफेर या बिक्री-प्रस्ताव नहीं।" },
    "“How do I share the gospel with someone?”": { ur: "“میں کسی کے ساتھ خوشخبری کیسے بانٹوں؟”", hi: "“मैं किसी के साथ सुसमाचार कैसे साझा करूँ?”" },
    "Ask permission, listen first, speak simply about Jesus and the hope you have received, then leave room for questions. Respect their freedom to respond.": { ur: "اجازت مانگیں، پہلے سنیں، یسوع اور پائی ہوئی امید کے بارے میں سادگی سے بتائیں، پھر سوالات کے لیے جگہ چھوڑیں۔ جواب دینے کی ان کی آزادی کا احترام کریں۔", hi: "अनुमति माँगें, पहले सुनें, यीशु और मिली हुई आशा के बारे में सरलता से बताएँ और प्रश्नों के लिए जगह छोड़ें। उत्तर देने की उनकी स्वतंत्रता का सम्मान करें।" },
    "“How can I evangelize respectfully?”": { ur: "“میں احترام کے ساتھ انجیلی بشارت کیسے دوں؟”", hi: "“मैं सम्मानपूर्वक सुसमाचार कैसे साझा करूँ?”" },
    "Treat people as people rather than projects. Listen generously, represent others fairly, avoid coercion, and speak with gentleness and respect.": { ur: "لوگوں کو منصوبوں کے بجائے انسان سمجھیں۔ دل کھول کر سنیں، دوسروں کو انصاف سے پیش کریں، جبر سے بچیں اور حلیمی و احترام سے بولیں۔", hi: "लोगों को परियोजनाओं के बजाय इंसान समझें। उदारता से सुनें, दूसरों को निष्पक्षता से प्रस्तुत करें, दबाव से बचें और नम्रता व आदर से बोलें।" },
    "“How can I evangelize online or with Gen Z?”": { ur: "“میں آن لائن یا Gen Z کے ساتھ انجیلی بشارت کیسے دوں؟”", hi: "“मैं ऑनलाइन या Gen Z के साथ सुसमाचार कैसे साझा करूँ?”" },
    "Use short, honest stories and real conversation. Ask thoughtful questions, listen across digital spaces, and connect online conversations to friendship, Scripture, prayer, and community.": { ur: "مختصر، ایماندار کہانیاں اور حقیقی گفتگو استعمال کریں۔ سوچے سمجھے سوالات پوچھیں، ڈیجیٹل جگہوں پر سنیں، اور آن لائن گفتگو کو دوستی، کتابِ مقدس، دعا اور برادری سے جوڑیں۔", hi: "छोटी, ईमानदार कहानियाँ और सच्ची बातचीत का उपयोग करें। विचारशील प्रश्न पूछें, डिजिटल स्थानों में सुनें और ऑनलाइन बातचीत को मित्रता, पवित्रशास्त्र, प्रार्थना और समुदाय से जोड़ें।" },
    "THE FIELD LIBRARY": { ur: "میدانی کتب خانہ", hi: "फील्ड लाइब्रेरी" },
    "Go further, with": { ur: "مزید آگے بڑھیں،", hi: "और आगे बढ़ें," },
    "seven field guides.": { ur: "سات میدانی رہنما کتابوں کے ساتھ۔", hi: "सात फील्ड गाइड के साथ।" },
    "Open the field library": { ur: "میدانی کتب خانہ کھولیں", hi: "फील्ड लाइब्रेरी खोलें" },
    "Biblical Mentoring": { ur: "بائبلی رہنمائی", hi: "बाइबिल आधारित मार्गदर्शन" },
    "A godly believer walking with a younger believer, through four stages of modelling, participation, empowering, and multiplying.": { ur: "ایک خدا ترس ایماندار کا کم عمر ایماندار کے ساتھ چلنا، نمونہ بننے، شمولیت، اختیار دینے اور بڑھانے کے چار مراحل میں۔", hi: "एक भक्त विश्वासी का युवा विश्वासी के साथ चलना—आदर्श, सहभागिता, सशक्तिकरण और गुणा करने के चार चरणों में।" },
    "Communicating the Gospel in Today’s Context": { ur: "آج کے تناظر میں خوشخبری پہنچانا", hi: "आज के संदर्भ में सुसमाचार साझा करना" },
    "What the gospel is and is not, the clearest summary of it in Scripture, and four qualities of a messenger worth hearing.": { ur: "خوشخبری کیا ہے اور کیا نہیں، کتابِ مقدس میں اس کا واضح ترین خلاصہ، اور قابلِ سماعت پیغامبر کی چار خوبیاں۔", hi: "सुसमाचार क्या है और क्या नहीं, पवित्रशास्त्र में उसका स्पष्ट सार और सुनने योग्य संदेशवाहक के चार गुण।" },
    "Key Characteristics of Gen Z": { ur: "Gen Z کی نمایاں خصوصیات", hi: "Gen Z की प्रमुख विशेषताएँ" },
    "Six strengths to thank God for, six challenges to shepherd, and a prayer-wall practice for carrying a generation before the Lord.": { ur: "خدا کا شکر ادا کرنے کی چھ قوتیں، رہنمائی کے لیے چھ چیلنجز، اور ایک نسل کو خداوند کے سامنے لانے کے لیے دعائیہ دیوار کی مشق۔", hi: "परमेश्वर को धन्यवाद देने के लिए छह सामर्थ्य, मार्गदर्शन के लिए छह चुनौतियाँ और एक पीढ़ी को प्रभु के सामने लाने की प्रार्थना-दीवार का अभ्यास।" },
    "Plan your goals": { ur: "اپنے اہداف بنائیں", hi: "अपने लक्ष्य बनाएँ" },
    "Keep a prayer wall": { ur: "دعاؤں کی دیوار رکھیں", hi: "प्रार्थना दीवार रखें" },
    "Read": { ur: "پڑھیں", hi: "पढ़ें" },
    "GO WITH GRACE": { ur: "فضل کے ساتھ جائیں", hi: "अनुग्रह के साथ जाएँ" },
    "Good news is better": { ur: "خوشخبری بہتر ہے جب", hi: "सुसमाचार बेहतर है जब वह" },
    "shared.": { ur: "بانٹی جائے۔", hi: "साझा किया जाए।" },
    "Prepare, pray, show up with love—and trust God with what follows.": { ur: "تیاری کریں، دعا کریں، محبت کے ساتھ حاضر ہوں—اور آگے کا معاملہ خدا پر چھوڑ دیں۔", hi: "तैयार हों, प्रार्थना करें, प्रेम के साथ उपस्थित हों और आगे की बात परमेश्वर पर छोड़ दें।" },
    "Explore the Scriptorium": { ur: "اسکرپٹوریم دیکھیں", hi: "स्क्रिप्टोरियम देखें" },
    "Watch & listen": { ur: "دیکھیں اور سنیں", hi: "देखें और सुनें" },
    "“Let your conversation be always full of grace.”": { ur: "“آپ کی گفتگو ہمیشہ فضل سے بھرپور ہو۔”", hi: "“आपकी बातचीत सदा अनुग्रह से भरी हो।”" },
    "Evangelism is a product of": { ur: "انجیلی بشارت پیشکش ہے", hi: "सुसमाचार प्रचार एक प्रस्तुति है" },
    "a biblical ministry project sharing Scripture-rooted resources worldwide.": { ur: "ایک بائبلی خدمت کا منصوبہ جو دنیا بھر میں کتابِ مقدس پر مبنی وسائل بانٹتا ہے۔", hi: "एक बाइबिल-आधारित सेवकाई परियोजना जो दुनिया भर में पवित्रशास्त्र-आधारित संसाधन साझा करती है।" },
    "Goal planner": { ur: "اہداف کا منصوبہ", hi: "लक्ष्य योजनाकार" },
    "Prayer notes": { ur: "دعائیہ نوٹس", hi: "प्रार्थना नोट्स" },
    "Back to top": { ur: "اوپر واپس جائیں", hi: "ऊपर जाएँ" },
    "Made to be read, shared, and carried with you.": { ur: "پڑھنے، بانٹنے اور اپنے ساتھ لے جانے کے لیے بنایا گیا۔", hi: "पढ़ने, साझा करने और अपने साथ ले जाने के लिए बनाया गया।" },
    "The goal planner and prayer notes are saved on your own device—nothing is uploaded—and every guide is precached to read without a signal.": { ur: "اہداف کا منصوبہ اور دعائیہ نوٹس آپ کے اپنے آلے پر محفوظ ہوتے ہیں—کچھ اپ لوڈ نہیں ہوتا—اور ہر رہنما کتاب بغیر سگنل کے پڑھنے کے لیے پہلے سے محفوظ ہے۔", hi: "लक्ष्य योजनाकार और प्रार्थना नोट्स आपके अपने डिवाइस पर सहेजे जाते हैं—कुछ भी अपलोड नहीं होता—और हर गाइड बिना सिग्नल के पढ़ने के लिए पहले से कैश है।" },
    "LIFE & MEANING": { ur: "زندگی اور معنی", hi: "जीवन और अर्थ" },
    "FAITH QUESTIONS": { ur: "ایمان کے سوالات", hi: "विश्वास के प्रश्न" },
    "PRAYER & CARE": { ur: "دعا اور نگہداشت", hi: "प्रार्थना और देखभाल" },
    "Start with what matters to them.": { ur: "ان کے لیے اہم بات سے آغاز کریں۔", hi: "उनके लिए महत्वपूर्ण बात से शुरुआत करें।" },
    "Let their experience shape the conversation before you share your own.": { ur: "اپنی بات بتانے سے پہلے ان کا تجربہ گفتگو کی سمت طے کرنے دیں۔", hi: "अपनी बात साझा करने से पहले उनके अनुभव को बातचीत की दिशा तय करने दें।" },
    "“What has shaped the way you think about faith?”": { ur: "“ایمان کے بارے میں آپ کی سوچ کو کس چیز نے تشکیل دی ہے؟”", hi: "“विश्वास के बारे में आपकी सोच को किस बात ने आकार दिया है?”" },
    "Make room for both stories.": { ur: "دونوں کہانیوں کے لیے جگہ بنائیں۔", hi: "दोनों कहानियों के लिए जगह बनाएँ।" },
    "Curiosity helps a conversation feel mutual instead of rehearsed.": { ur: "تجسس گفتگو کو مشق شدہ کے بجائے باہمی محسوس ہونے میں مدد دیتا ہے۔", hi: "जिज्ञासा बातचीत को रटी हुई नहीं बल्कि पारस्परिक बनाने में मदद करती है।" },
    "“Have you ever had an experience that made you wonder about God?”": { ur: "“کیا کبھی ایسا تجربہ ہوا جس نے آپ کو خدا کے بارے میں سوچنے پر مجبور کیا؟”", hi: "“क्या कभी ऐसा अनुभव हुआ जिसने आपको परमेश्वर के बारे में सोचने पर मजबूर किया?”" },
    "Begin with what gives life meaning.": { ur: "زندگی کو معنی دینے والی بات سے آغاز کریں۔", hi: "जीवन को अर्थ देने वाली बात से शुरुआत करें।" },
    "An ordinary question can open a deeper conversation at the right pace.": { ur: "ایک عام سوال مناسب رفتار سے گہری گفتگو کا دروازہ کھول سکتا ہے۔", hi: "एक साधारण प्रश्न सही गति से गहरी बातचीत का द्वार खोल सकता है।" },
    "“What gives you hope when life feels uncertain?”": { ur: "“جب زندگی غیر یقینی لگے تو آپ کو کیا امید دیتا ہے؟”", hi: "“जब जीवन अनिश्चित लगता है तो आपको क्या आशा देता है?”" },
    "Pay attention to the longings beneath the answer.": { ur: "جواب کے نیچے چھپی خواہشوں پر توجہ دیں۔", hi: "उत्तर के पीछे छिपी लालसाओं पर ध्यान दें।" },
    "Listen for the joys, questions, and hopes that matter most to them.": { ur: "ان خوشیوں، سوالات اور امیدوں کو سنیں جو ان کے لیے سب سے اہم ہیں۔", hi: "उन खुशियों, प्रश्नों और आशाओं को सुनें जो उनके लिए सबसे महत्वपूर्ण हैं।" },
    "“What do you wish there was more of in the world?”": { ur: "“آپ چاہتے ہیں کہ دنیا میں کس چیز کی زیادتی ہو؟”", hi: "“आप चाहते हैं कि दुनिया में किस चीज़ की अधिकता हो?”" },
    "Invite, rather than assume.": { ur: "فرض کرنے کے بجائے دعوت دیں۔", hi: "मान लेने के बजाय आमंत्रित करें।" },
    "Let the person choose how far the conversation goes.": { ur: "شخص کو طے کرنے دیں کہ گفتگو کتنی آگے جائے۔", hi: "व्यक्ति को तय करने दें कि बातचीत कितनी आगे जाए।" },
    "“Would faith be something you’d ever want to explore?”": { ur: "“کیا ایمان ایسی چیز ہے جسے آپ کبھی تلاش کرنا چاہیں گے؟”", hi: "“क्या विश्वास ऐसी चीज़ है जिसे आप कभी खोजना चाहेंगे?”" },
    "Let their question set the direction.": { ur: "ان کا سوال سمت طے کرنے دیں۔", hi: "उनके प्रश्न को दिशा तय करने दें।" },
    "You don’t need to steer toward a prepared answer. Start with what is real for them.": { ur: "آپ کو تیار جواب کی طرف موڑنے کی ضرورت نہیں۔ جو ان کے لیے حقیقی ہے وہیں سے شروع کریں۔", hi: "आपको तैयार उत्तर की ओर मोड़ने की ज़रूरत नहीं। उनके लिए जो वास्तविक है वहीं से शुरुआत करें।" },
    "“Is there something about Christianity you’ve always wondered about?”": { ur: "“کیا مسیحیت کے بارے میں کوئی ایسی بات ہے جس پر آپ ہمیشہ حیران رہے ہیں؟”", hi: "“क्या ईसाई विश्वास के बारे में कोई बात है जिसके बारे में आप हमेशा सोचते रहे हैं?”" },
    "Make uncertainty safe to name.": { ur: "غیر یقینی کو بیان کرنا محفوظ بنائیں۔", hi: "अनिश्चितता को कहना सुरक्षित बनाएँ।" },
    "Honest doubt is an invitation to listen carefully, not a problem to shut down.": { ur: "ایماندار شک غور سے سننے کی دعوت ہے، بند کر دینے کا مسئلہ نہیں۔", hi: "ईमानदार संदेह ध्यान से सुनने का निमंत्रण है, बंद कर देने की समस्या नहीं।" },
    "“What feels hardest to believe about God?”": { ur: "“خدا کے بارے میں یقین کرنا آپ کو سب سے مشکل کیا لگتا ہے؟”", hi: "“परमेश्वर के बारे में विश्वास करना आपको सबसे कठिन क्या लगता है?”" },
    "Explore together.": { ur: "مل کر تلاش کریں۔", hi: "मिलकर खोजें।" },
    "It is okay not to know. You can read, ask, and learn side by side.": { ur: "نہ جاننا ٹھیک ہے۔ آپ ساتھ ساتھ پڑھ، پوچھ اور سیکھ سکتے ہیں۔", hi: "न जानना ठीक है। आप साथ-साथ पढ़, पूछ और सीख सकते हैं।" },
    "“Would you like to look at what Jesus says about that?”": { ur: "“کیا آپ دیکھنا چاہیں گے کہ یسوع اس بارے میں کیا کہتے ہیں؟”", hi: "“क्या आप देखना चाहेंगे कि यीशु इस बारे में क्या कहते हैं?”" },
    "Offer care without making assumptions.": { ur: "فرض کیے بغیر خیال رکھنے کی پیشکش کریں۔", hi: "बिना कुछ मान लिए देखभाल की पेशकश करें।" },
    "A kind offer leaves the other person free to say yes or no.": { ur: "مہربان پیشکش دوسرے شخص کو ہاں یا نہ کہنے کی آزادی دیتی ہے۔", hi: "दयालु प्रस्ताव दूसरे व्यक्ति को हाँ या ना कहने की स्वतंत्रता देता है।" },
    "“Is there anything you’d like me to pray about?”": { ur: "“کیا کوئی ایسی بات ہے جس کے لیے آپ چاہتے ہیں کہ میں دعا کروں؟”", hi: "“क्या कोई बात है जिसके लिए आप चाहते हैं कि मैं प्रार्थना करूँ?”" },
    "Let compassion come before advice.": { ur: "مشورے سے پہلے ہمدردی آنے دیں۔", hi: "सलाह से पहले करुणा को आने दें।" },
    "Being present can matter more than having the right words.": { ur: "موجود رہنا درست الفاظ رکھنے سے زیادہ اہم ہو سکتا ہے۔", hi: "उपस्थित रहना सही शब्दों से अधिक महत्वपूर्ण हो सकता है।" },
    "“Would you like me to listen, or would it help to think this through together?”": { ur: "“کیا آپ چاہتے ہیں کہ میں سنوں، یا اس پر مل کر سوچنا مددگار ہوگا؟”", hi: "“क्या आप चाहेंगे कि मैं सुनूँ, या साथ मिलकर सोचना मदद करेगा?”" },
    "Keep the invitation gentle.": { ur: "دعوت کو نرم رکھیں۔", hi: "निमंत्रण को कोमल रखें।" },
    "If they are comfortable, prayer can be a simple way to share hope.": { ur: "اگر وہ آرام دہ محسوس کریں تو دعا امید بانٹنے کا سادہ طریقہ ہو سکتی ہے۔", hi: "यदि वे सहज हों तो प्रार्थना आशा साझा करने का सरल तरीका हो सकती है।" },
    "“Would it be okay if I prayed with you now?”": { ur: "“کیا یہ ٹھیک ہوگا اگر میں ابھی آپ کے ساتھ دعا کروں؟”", hi: "“क्या यह ठीक होगा अगर मैं अभी आपके साथ प्रार्थना करूँ?”" }
  };

  const titles = {
    en: "Evangelism — A field guide by Saul's Podship",
    ur: "انجیلی بشارت — ساؤل کے پوڈشپ کی رہنما کتاب",
    hi: "सुसमाचार — साउल्स पॉडशिप की मार्गदर्शिका"
  };
  const descriptions = {
    en: "Learn how to share the gospel and talk about Jesus with clarity, courage, humility, and grace. Free Christian evangelism training, conversation starters, FAQs, Scripture, and practical field guides from Saul's Podship.",
    ur: "خوشخبری بانٹنے اور یسوع کے بارے میں وضاحت، حوصلے، فروتنی اور فضل کے ساتھ بات کرنا سیکھیں۔ ساؤل کے پوڈشپ کی مفت مسیحی انجیلی بشارت کی تربیت، گفتگو کے آغاز، سوالات، کتابِ مقدس اور عملی رہنما کتابیں۔",
    hi: "सुसमाचार साझा करना और यीशु के बारे में स्पष्टता, साहस, नम्रता और अनुग्रह के साथ बात करना सीखें। साउल्स पॉडशिप की निःशुल्क मसीही सुसमाचार प्रशिक्षण, बातचीत की शुरुआत, प्रश्न, पवित्रशास्त्र और व्यावहारिक फील्ड गाइड।"
  };

  let language = "en";
  let theme = "light";
  const originalDocumentTitle = document.title;
  const originalText = new WeakMap();
  const originalAttrs = new WeakMap();

  function dictionary(languageCode) {
    return languageCode === "en" ? null : common;
  }

  function siteTranslate(value) {
    const key = normalize(value);
    if (!key || language === "en") return value;
    const item = dictionary(language)?.[key];
    return item?.[language] || value;
  }

  function translateTextNodes() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      if (node.parentElement?.closest("script, style, .icon-definitions, [data-no-translate]")) return;
      if (!originalText.has(node)) originalText.set(node, node.nodeValue);
      const source = originalText.get(node);
      const key = normalize(source);
      const replacement = siteTranslate(key);
      if (!key || replacement === key) {
        node.nodeValue = source;
        return;
      }
      const leading = source.match(/^\s*/)?.[0] || "";
      const trailing = source.match(/\s*$/)?.[0] || "";
      node.nodeValue = `${leading}${replacement}${trailing}`;
    });
  }

  function translateAttributes() {
    document.querySelectorAll("[placeholder], [title], [aria-label], [alt]").forEach((element) => {
      ["placeholder", "title", "aria-label", "alt"].forEach((attribute) => {
        if (!element.hasAttribute(attribute)) return;
        const key = `${attribute}:${element.getAttribute(attribute)}`;
        if (!originalAttrs.has(element)) originalAttrs.set(element, {});
        const cache = originalAttrs.get(element);
        if (!cache[attribute]) cache[attribute] = element.getAttribute(attribute);
        element.setAttribute(attribute, siteTranslate(cache[attribute]));
      });
    });
  }

  function injectControls() {
    const actions = document.querySelector(".header-actions");
    if (!actions || actions.querySelector(".site-preferences")) return;
    const wrapper = document.createElement("div");
    wrapper.className = "site-preferences";
    wrapper.setAttribute("aria-label", "Site preferences");
    wrapper.innerHTML = `<button class="theme-toggle" id="theme-toggle" type="button" aria-pressed="false" aria-label="Switch to dark mode"><span class="theme-toggle-icon" aria-hidden="true">☼</span><span data-theme-label>Dark mode</span></button><div class="language-switcher" role="group" aria-label="Choose language"><button type="button" data-language="en" class="is-active" aria-pressed="true">EN</button><button type="button" data-language="ur" aria-pressed="false">اردو</button><button type="button" data-language="hi" aria-pressed="false">हिन्दी</button></div>`;
    actions.prepend(wrapper);
  }

  function updateControlState() {
    const toggle = document.getElementById("theme-toggle");
    const label = document.querySelector("[data-theme-label]");
    if (toggle) {
      toggle.setAttribute("aria-pressed", String(theme === "dark"));
      toggle.setAttribute("aria-label", siteTranslate(theme === "dark" ? "Switch to light mode" : "Switch to dark mode"));
    }
    if (label) label.textContent = siteTranslate(theme === "dark" ? "Light mode" : "Dark mode");
    document.querySelectorAll("[data-language]").forEach((button) => {
      const selected = button.dataset.language === language;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  }

  function applyTheme(nextTheme) {
    theme = nextTheme === "dark" ? "dark" : "light";
    if (theme === "dark") document.documentElement.setAttribute("data-theme", "dark");
    else document.documentElement.removeAttribute("data-theme");
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = theme === "dark" ? "#10110f" : "#f8f6f0";
    try { localStorage.setItem(storageTheme, theme); } catch (error) { /* private browsing */ }
    updateControlState();
    document.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }));
  }

  function applyLanguage(nextLanguage) {
    language = ["en", "ur", "hi"].includes(nextLanguage) ? nextLanguage : "en";
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ur" ? "rtl" : "ltr";
    translateTextNodes();
    translateAttributes();
    if (language === "en") {
      document.title = originalDocumentTitle;
    } else if (originalDocumentTitle.startsWith("Evangelism")) {
      document.title = titles[language];
    } else {
      document.title = language === "ur"
        ? "انجیلی بشارت — ساؤل کے پوڈشپ کی میدانی رہنما کتابیں"
        : "सुसमाचार — साउल्स पॉडशिप की फील्ड गाइड";
    }
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = descriptions[language];
    updateControlState();
    try { localStorage.setItem(storageLanguage, language); } catch (error) { /* private browsing */ }
    document.dispatchEvent(new CustomEvent("languagechange", { detail: { language } }));
  }

  function init() {
    injectControls();
    const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
    try { language = ["en", "ur", "hi"].includes(requestedLanguage) ? requestedLanguage : (localStorage.getItem(storageLanguage) || "en"); } catch (error) { language = requestedLanguage || "en"; }
    try { theme = localStorage.getItem(storageTheme) || "light"; } catch (error) { theme = "light"; }
    document.getElementById("theme-toggle")?.addEventListener("click", () => applyTheme(theme === "dark" ? "light" : "dark"));
    document.querySelectorAll("[data-language]").forEach((button) => button.addEventListener("click", () => applyLanguage(button.dataset.language)));
    applyTheme(theme);
    applyLanguage(language);
  }

  window.siteTranslate = siteTranslate;
  window.siteI18n = { applyLanguage, applyTheme, getLanguage: () => language, getTheme: () => theme };
  init();
})();
