/* ============================================================
   পদ্মা কেয়ার ক্লিনিক ও ডায়াগনস্টিক সেন্টার, রাজশাহী — script.js
   ------------------------------------------------------------
   সম্পূর্ণ JavaScript একটি ফাইলে (রিকোয়ারমেন্ট: HTML + CSS + JS
   = ৩টি আলাদা ফাইল)। এই ফাইলের ভেতরে ৫টি চিহ্নিত অংশ আছে:

     অংশ ১/৫  SITE CONFIGURATION → নিজের ক্লিনিকের নাম, ফোন,
                                    ঠিকানা, গুগল ম্যাপ, ডাটা
                                    স্টোরেজ সেটিংস
     অংশ ২/৫  DEFAULT DATA       → টেস্ট মূল্য, প্যাকেজ, ডাক্তার,
                                    FAQ, নোটিশ (বাংলা + English)
     অংশ ৩/৫  I18N / ভাষা        → বাংলা ⇄ English ব্যবস্থাপনা
     অংশ ৪/৫  DATA API           → ফ্রি ডাটা স্টোরেজ ফেচিং লেয়ার
                                    (Firebase / Google Sheets /
                                    localStorage)
     অংশ ৫/৫  MAIN UI LOGIC      → সেকশন রেন্ডার, অ্যানিমেশন,
                                    স্টিকি নেভ, ফর্ম, রিপোর্ট চেক

   ▶ নিজের ক্লিনিকের তথ্য বসাতে: "অংশ ১" এর CONFIG এডিট করুন।
   ▶ টেস্টের মূল্য / প্যাকেজ / ডাক্তার বদলাতে: "অংশ ২" এডিট করুন।
   ▶ ফর্মের ডাটা ক্লাউডে (ফ্রি) পাঠাতে: "অংশ ১" এর storage সেটআপ
     করুন — Firebase Realtime Database অথবা Google Sheets Apps
     Script (দুটোই ফ্রি; ধাপে ধাপে নির্দেশনা সেই সেকশনের কমেন্টে)।
     কিছু সেটআপ না করলে ডাটা ব্রাউজারের localStorage এ থাকবে
     এবং সাইটের সব ফিচার তবুও কাজ করবে।
   ============================================================ */

/* ═══════════════ অংশ ১/৫ — SITE CONFIGURATION (নিজের তথ্য এখানে বদলান) ═══════════════ */

/* ============================================================
   পদ্মা কেয়ার ক্লিনিক ও ডায়াগনস্টিক সেন্টার, রাজশাহী
   SITE CONFIGURATION FILE
   ------------------------------------------------------------
   এই ফাইলে সাইটের সব গুরুত্বপূর্ণ তথ্য এক জায়গায় রাখা হয়েছে।
   আপনার ক্লিনিকের আসল নাম, ফোন নম্বর, ঠিকানা দিয়ে শুধু এখানের
   ভ্যালুগুলো বদলে দিলেই পুরো ওয়েবসাইট আপডেট হয়ে যাবে।
   ============================================================ */

window.PADMA_CONFIG = {

  /* ---------- ১) ক্লিনিকের বেসিক তথ্য ---------- */
  brand: {
    nameBn: "পদ্মা কেয়ার ক্লিনিক ও ডায়াগনস্টিক সেন্টার",
    nameEn: "Padma Care Clinic & Diagnostic Center",
    shortNameBn: "পদ্মা কেয়ার",
    shortNameEn: "Padma Care",
    sloganBn: "আপনার সুস্থতা — আমাদের অঙ্গীকার",
    sloganEn: "Your Health — Our Commitment",
  },

  /* ---------- ২) যোগাযোগ (আপনার আসল নম্বর বসান) ---------- */
  contact: {
    hotline: "01300-123456",          // হটলাইন
    emergency: "01700-456789",        // ২৪/৭ ইমারজেন্সি ও অ্যাম্বুলেন্স
    whatsapp: "8801700456789",        // WhatsApp (দেশের কোডসহ, + ছাড়া)
    email: "info@padmacare.com.bd",
  },

  /* ---------- ৩) ঠিকানা (রাজশাহী) ---------- */
  address: {
    linesBn: ["প্লট ১৫/এ, শেরশাহ রোড", "লক্ষীপুর মোড়, রাজপাড়া", "বোয়ালিয়া, রাজশাহী - ৬০০০"],
    linesEn: ["Plot 15/A, Shershah Road", "Laxmipur More, Rajpara", "Boalia, Rajshahi - 6000"],
    areaHintBn: "লক্ষীপুর মোড় হতে ৫০ মিটার পশ্চিমে, সড়কের দক্ষিণ পাশে",
    areaHintEn: "50m west of Laxmipur More, south side of the road",
  },

  /* ---------- ৪) গুগল ম্যাপ ---------- */
  map: {
    // এমবেড করা ম্যাপ (API key ছাড়াই কাজ করে)
    embedQuery: "Laxmipur+More,+Rajshahi",
    zoom: 16,
    language: "bn",
    // "কিভাবে যাবেন" বাটনের লিংক
    directionsQuery: "Laxmipur+More,+Rajshahi",
    // সাইটের SEO তে ব্যবহৃত কোঅর্ডিনেট (রাজশাহী শহর: 24.374, 88.601)
    latitude: 24.3745,
    longitude: 88.6011,
  },

  /* ---------- ৫) সোশ্যাল লিংক ---------- */
  social: {
    facebook: "https://facebook.com/padmacare",
    youtube: "https://youtube.com/@padmacare",
    instagram: "https://instagram.com/padmacare",
  },

  /* ---------- ৬) ফ্রি ডাটা স্টোরেজ সেটআপ (ডাটা ফেচিং) ----------
     ফর্মের ডাটা (অ্যাপয়েন্টমেন্ট, রিপোর্ট চেক ইত্যাদি) সেভ ও
     ফেচ করার জন্য দুটি ফ্রি অপশন আছে। যেকোনো একটি বা দুটোই
     ব্যবহার করা যাবে। কিছু না বসালে ডাটা ব্রাউজারের localStorage
     এ সেভ হবে (ডেমো মোড)।

     ▶ অপশন A: Google Firebase Realtime Database (ফ্রি Spark প্লান)
       ১. https://console.firebase.google.com এ ফ্রি প্রজেক্ট তৈরি করুন
       ২. Build → Realtime Database → Create Database (Asia region)
       ৩. Rules এ প্রথমে test mode দিন
       ৪. Database URL নিচে বসান, যেমন:
          "https://padma-care-default-rtdb.asia-southeast1.firebasedatabase.app"

     ▶ অপশন B: Google Sheets + Apps Script (সম্পূর্ণ ফ্রি)
       ১. গুগল শিট তৈরি করুন → Extensions → Apps Script
       ২. doPost(e) লিখে e.postData.contents পার্স করে শিটে রো যোগ করুন
       ৩. Deploy → New deployment → Web app → Access: Anyone
       ৪. পাওয়া Web App URL নিচে বসান                    */
  storage: {
    firebaseDatabaseURL: "",   // যেমন: "https://xxx-default-rtdb.asia-southeast1.firebasedatabase.app"
    googleAppsScriptURL: "",   // যেমন: "https://script.google.com/macros/s/XXXX/exec"
  },

  /* ---------- ৭) রানটাইম অন্যান্য ---------- */
  runtime: {
    scrollTopOffset: 0.9,   // Hero সেকশনের কত % স্ক্রল করলে Scroll-to-top দেখা যাবে
    testimonialDelay: 6000, // টেস্টিমোনিয়াল স্লাইডারের সময় (ms)
    defaultLang: "bn",      // ডিফল্ট ভাষা: "bn" (বাংলা) বা "en" (English)
  },
};

/* ═══════════════ অংশ ২/৫ — DEFAULT DATA (মূল্য / প্যাকেজ / ডাক্তার / FAQ) ═══════════════ */

/* ============================================================
   পদ্মা কেয়ার — DEFAULT DATA (বাংলা + English)
   ------------------------------------------------------------
   এগুলো বিল্ট-ইন ডিফল্ট ডাটা। config.js এ Firebase বা Google
   Sheets সেটআপ করলে ডাটা সেখান থেকে "ফেচ" করা হবে; সেটআপ না
   থাকলে বা নেটওয়ার্ক ফেইল করলে এই ডাটা দেখানো হয়।
   মূল্যগুলো রাজশাহী অঞ্চলের বাজারদরের রেফারেন্স মূল্য (২০২৫)।
   ============================================================ */

window.PADMA_DEFAULT_DATA = {

  /* ---------- নোটিশ টিকার ---------- */
  notices: [
    { bn: "২৪/৭ ইমারজেন্সি ও অ্যাম্বুলেন্স সেবা সচল", en: "24/7 Emergency & Ambulance service active" },
    { bn: "৳১০০০+ মূল্যের পরীক্ষায় হোম স্যাম্পল কালেকশন ফ্রি", en: "Free home sample collection for tests over ৳1000" },
    { bn: "ডিজিটাল রিপোর্ট পাঠানো হয় SMS ও WhatsApp এ", en: "Digital reports delivered via SMS & WhatsApp" },
    { bn: "প্রতি শুক্রবার বিশেষজ্ঞ স্বাস্থ্য ক্যাম্প, সকাল ৯টা–১টা", en: "Specialist health camp every Friday, 9am–1pm" },
    { bn: "অ্যাপয়েন্টমেন্টে নগদ/বিকাশে ১০% ডিসকাউন্ট ল্যাব বিলে", en: "10% lab discount on bKash/Nagad prepayment" },
  ],

  /* ---------- Hero স্ট্যাটস ---------- */
  stats: [
    { value: 50000, suffix: "+", label: { bn: "বার্ষিক পরীক্ষা সম্পন্ন", en: "Tests per year" } },
    { value: 25, suffix: "+", label: { bn: "বিশেষজ্ঞ ডাক্তার", en: "Specialist doctors" } },
    { value: 900, suffix: "+", label: { bn: "টেস্ট মেন্যু", en: "Test menu" } },
    { value: 15, suffix: "+", label: { bn: "বছরের অভিজ্ঞতা", en: "Years of experience" } },
  ],

  /* ---------- ওয়েবসাইট কী সমস্যা সমাধান করে (Business analysis) ---------- */
  solutions: [
    {
      icon: "booking",
      title: { bn: "অনলাইন অ্যাপয়েন্টমেন্ট", en: "Online Appointment" },
      desc: { bn: "ফোনে ব্যস্ত থাকার ঝামেলা শেষ — রোগী ঘরে বসে সিরিয়াল নিচ্ছেন, ফলে লাইনে দাঁড়ানো ও মিসড কল দুটোই কমেছে।", en: "No more busy phone lines — patients book serials from home, cutting queues and missed calls." },
    },
    {
      icon: "report",
      title: { bn: "ডিজিটাল রিপোর্ট চেক", en: "Digital Report Check" },
      desc: { bn: "রিপোর্ট সংগ্রহে আবার শহরের দূরত্ব পাড়ি দিতে হয় না — রিপোর্ট নম্বর দিয়ে অনলাইনেই স্ট্যাটাস ও ডাউনলোড।", en: "No second trip to collect reports — check status and download online with a report ID." },
    },
    {
      icon: "price",
      title: { bn: "স্বচ্ছ মূল্য তালিকা", en: "Transparent Price List" },
      desc: { bn: "আগে থেকেই খরচ জানা থাকায় আর্থিক বিভ্রান্তি নেই — এটাই রোগীর আস্থা ও ব্র্যান্ড ভ্যালু বাড়ানোর মূল চাবিকাঠি।", en: "Knowing the cost upfront removes financial confusion — the key to patient trust and brand value." },
    },
    {
      icon: "home",
      title: { bn: "হোম স্যাম্পল কালেকশন", en: "Home Sample Collection" },
      desc: { bn: "ব্যস্ত ও প্রবীণ রোগীরা বাড়িতেই রক্ত দিচ্ছেন — এই সুবিধা বার্ষিক পরীক্ষার সংখ্যা উল্লেখযোগ্যভাবে বাড়িয়েছে।", en: "Busy and elderly patients give samples at home — a facility that measurably grows test volume." },
    },
    {
      icon: "doctor",
      title: { bn: "বিশেষজ্ঞ ডাক্তার প্যানেল", en: "Specialist Doctor Panel" },
      desc: { bn: "কার চেম্বার কবে তা সাইটেই দেখা যায় — সঠিক বিশেষজ্ঞ খুঁজে পাওয়া সহজ হয়েছে, রেফারেল কমে ভিজিট বেড়েছে।", en: "Chamber schedules are visible on the site — finding the right specialist is easier, so visits increase." },
    },
    {
      icon: "emergency",
      title: { bn: "২৪/৭ ইমারজেন্সি তথ্য", en: "24/7 Emergency Access" },
      desc: { bn: "এক ক্লিকে ইমারজেন্সি নম্বর ও লোকেশন ম্যাপ — জরুরি মুহূর্তে রোগী দ্রুত পৌঁছাতে পারে, ইমেজ বাড়ে।", en: "One-click emergency numbers and map location — patients reach faster in critical moments." },
    },
  ],

  /* ---------- সেবাসমূহ ---------- */
  services: [
    {
      id: "pathology",
      icon: "flask",
      image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=75",
      title: { bn: "প্যাথলজি ল্যাব", en: "Pathology Lab" },
      desc: { bn: "অটো-অ্যানালাইজার দিয়ে রক্ত, প্রস্রাব, হরমোন ও বায়োকেমিস্ট্রি পরীক্ষা — WHO স্ট্যান্ডার্ড কন্ট্রোল স্যাম্পল সহ।", en: "Blood, urine, hormone & biochemistry tests on automated analysers with WHO-standard controls." },
    },
    {
      id: "imaging",
      icon: "scan",
      image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=75",
      title: { bn: "রেডিওলজি ও ইমেজিং", en: "Radiology & Imaging" },
      desc: { bn: "ডিজিটাল এক্স-রে, আল্ট্রাসনোগ্রাম, CT ও MRI — অভিজ্ঞ রেডিওলজিস্টের তত্ত্বাবধানে সঠিক রিপোর্ট।", en: "Digital X-ray, ultrasonogram, CT & MRI — accurate reporting under expert radiologists." },
    },
    {
      id: "cardiac",
      icon: "heart",
      image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=800&q=75",
      title: { bn: "কার্ডিয়াক সেবা", en: "Cardiac Care" },
      desc: { bn: "ECG, Echocardiography, ETT ও হোল্টার মনিটরিং — হার্টের সম্পূর্ণ মূল্যায়ন এক জায়গায়।", en: "ECG, echocardiography, ETT & Holter monitoring — complete heart evaluation in one place." },
    },
    {
      id: "opd",
      icon: "doctor",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=75",
      title: { bn: "বিশেষজ্ঞ আউটডোর চেম্বার", en: "Specialist OPD" },
      desc: { bn: "মেডিসিন, কার্ডিওলজি, গাইনি, শিশু ও অর্থোপেডিক্স বিশেষজ্ঞের নিয়মিত চেম্বার — অনলাইন সিরিয়াল সহ।", en: "Regular chambers of medicine, cardiology, gynae, paediatrics & orthopaedics specialists with online serials." },
    },
    {
      id: "homecollection",
      icon: "home",
      image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=75",
      title: { bn: "হোম স্যাম্পল কালেকশন", en: "Home Sample Collection" },
      desc: { bn: "প্রশিক্ষিত টেকনিশিয়ান ঘরে গিয়ে স্যাম্পল নেন — রাজশাহী সিটি করপোরেশনের সব এলাকায় কভারেজ।", en: "Trained phlebotomists collect samples at your home — covering all areas of Rajshahi City Corporation." },
    },
    {
      id: "emergency",
      icon: "ambulance",
      image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=800&q=75",
      title: { bn: "ইমারজেন্সি ও অ্যাম্বুলেন্স", en: "Emergency & Ambulance" },
      desc: { bn: "২৪ ঘণ্টা চিকিৎসা টিম ও AC অ্যাম্বুলেন্স — রাজশাহী মেডিকেল কলেজ হাসপাতাল পর্যন্ত শিফটিং সহ।", en: "24-hour medical team & AC ambulance — including patient shifting to Rajshahi Medical College Hospital." },
    },
    {
      id: "diabetes",
      icon: "drop",
      image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=800&q=75",
      title: { bn: "ডায়াবেটিস ও থাইরয়েড ক্লিনিক", en: "Diabetes & Thyroid Clinic" },
      desc: { bn: "শুক্রবারে ফ্রি ফুট স্ক্রিনিং ও ডায়েট পরামর্শ — ডায়াবেটিস রোগীদের জন্য পূর্ণাঙ্গ ফলো-আপ প্রোগ্রাম।", en: "Free foot screening & diet counselling on Fridays — a complete follow-up programme for diabetic patients." },
    },
    {
      id: "wellness",
      icon: "pulse",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=75",
      title: { bn: "ফিজিওথেরাপি ও ওয়েলনেস", en: "Physiotherapy & Wellness" },
      desc: { bn: "স্ট্রোক রিহ্যাব, ব্যথা ম্যানেজমেন্ট ও প্রি-এমপ্লয়মেন্ট ফিটনেস সার্টিফিকেট — আধুনিক যন্ত্রপাতিসহ।", en: "Stroke rehab, pain management & pre-employment fitness certification with modern equipment." },
    },
  ],

  /* ---------- পরীক্ষার মূল্য তালিকা (রাজশাহী রেফারেন্স মূল্য) ---------- */
  testCategories: {
    pathology: { bn: "প্যাথলজি", en: "Pathology" },
    imaging:   { bn: "ইমেজিং ও রেডিওলজি", en: "Imaging & Radiology" },
    cardiac:   { bn: "কার্ডিয়াক", en: "Cardiac" },
    special:   { bn: "বিশেষ পরীক্ষা", en: "Special Tests" },
  },

  tests: [
    { id: "t01", cat: "pathology", name: { bn: "সিবিসি (CBC)", en: "CBC (Complete Blood Count)" }, price: 400,  days: { bn: "প্রতিদিন", en: "Daily" },  prep: { bn: "নাস্তার প্রয়োজন নেই", en: "No fasting needed" } },
    { id: "t02", cat: "pathology", name: { bn: "ইএসআর (ESR)", en: "ESR" }, price: 150, days: { bn: "প্রতিদিন", en: "Daily" }, prep: { bn: "নাস্তার প্রয়োজন নেই", en: "No fasting needed" } },
    { id: "t03", cat: "pathology", name: { bn: "ব্লাড গ্রুপিং + Rh", en: "Blood Grouping + Rh" }, price: 200, days: { bn: "প্রতিদিন", en: "Daily" }, prep: { bn: "নাস্তার প্রয়োজন নেই", en: "No fasting needed" } },
    { id: "t04", cat: "pathology", name: { bn: "রক্তে সুগার (FBS / 2HBS / RBS)", en: "Blood Sugar (FBS / 2HBS / RBS)" }, price: 150, days: { bn: "প্রতিদিন", en: "Daily" }, prep: { bn: "FBS: ৮–১০ ঘণ্টা নাস্তা", en: "FBS: 8–10 hrs fasting" } },
    { id: "t05", cat: "pathology", name: { bn: "HbA1c (গ্লাইকেটেড হিমোগ্লোবিন)", en: "HbA1c (Glycated Haemoglobin)" }, price: 700, days: { bn: "প্রতিদিন", en: "Daily" }, prep: { bn: "নাস্তার প্রয়োজন নেই", en: "No fasting needed" } },
    { id: "t06", cat: "pathology", name: { bn: "লিপিড প্রোফাইল", en: "Lipid Profile" }, price: 800, days: { bn: "প্রতিদিন", en: "Daily" }, prep: { bn: "১২ ঘণ্টা নাস্তা", en: "12 hrs fasting" } },
    { id: "t07", cat: "pathology", name: { bn: "SGPT (ALT)", en: "SGPT (ALT)" }, price: 300, days: { bn: "প্রতিদিন", en: "Daily" }, prep: { bn: "৮ ঘণ্টা নাস্তা", en: "8 hrs fasting" } },
    { id: "t08", cat: "pathology", name: { bn: "SGOT (AST)", en: "SGOT (AST)" }, price: 300, days: { bn: "প্রতিদিন", en: "Daily" }, prep: { bn: "৮ ঘণ্টা নাস্তা", en: "8 hrs fasting" } },
    { id: "t09", cat: "pathology", name: { bn: "সিরাম ক্রিয়েটিনিন", en: "Serum Creatinine" }, price: 300, days: { bn: "প্রতিদিন", en: "Daily" }, prep: { bn: "৮ ঘণ্টা নাস্তা", en: "8 hrs fasting" } },
    { id: "t10", cat: "pathology", name: { bn: "বিউরিয়া (BUN)", en: "Blood Urea (BUN)" }, price: 300, days: { bn: "প্রতিদিন", en: "Daily" }, prep: { bn: "৮ ঘণ্টা নাস্তা", en: "8 hrs fasting" } },
    { id: "t11", cat: "pathology", name: { bn: "সিরাম ইউরিক এসিড", en: "Serum Uric Acid" }, price: 300, days: { bn: "প্রতিদিন", en: "Daily" }, prep: { bn: "নাস্তার প্রয়োজন নেই", en: "No fasting needed" } },
    { id: "t12", cat: "pathology", name: { bn: "TSH", en: "TSH" }, price: 500, days: { bn: "প্রতিদিন", en: "Daily" }, prep: { bn: "সকালে খালি পেটে", en: "Morning, fasting" } },
    { id: "t13", cat: "pathology", name: { bn: "থাইরয়েড প্রোফাইল (T3, T4, TSH)", en: "Thyroid Profile (T3, T4, TSH)" }, price: 1200, days: { bn: "প্রতিদিন", en: "Daily" }, prep: { bn: "সকালে খালি পেটে", en: "Morning, fasting" } },
    { id: "t14", cat: "pathology", name: { bn: "প্রস্রাব R/E", en: "Urine R/E" }, price: 200, days: { bn: "প্রতিদিন", en: "Daily" }, prep: { bn: "মধ্য প্রবাহ স্যাম্পল", en: "Mid-stream sample" } },
    { id: "t15", cat: "pathology", name: { bn: "স্টুল R/E", en: "Stool R/E" }, price: 250, days: { bn: "প্রতিদিন", en: "Daily" }, prep: { bn: "১ ঘণ্টার মধ্যে দিতে হবে", en: "Submit within 1 hour" } },
    { id: "t16", cat: "pathology", name: { bn: "উইডাল টেস্ট", en: "Widal Test" }, price: 400, days: { bn: "প্রতিদিন", en: "Daily" }, prep: { bn: "নাস্তার প্রয়োজন নেই", en: "No fasting needed" } },
    { id: "t17", cat: "pathology", name: { bn: "ডেঙ্গু NS1 এন্টিজেন", en: "Dengue NS1 Antigen" }, price: 600, days: { bn: "প্রতিদিন", en: "Daily" }, prep: { bn: "নাস্তার প্রয়োজন নেই", en: "No fasting needed" } },
    { id: "t18", cat: "pathology", name: { bn: "ডেঙ্গু IgG / IgM", en: "Dengue IgG / IgM" }, price: 700, days: { bn: "প্রতিদিন", en: "Daily" }, prep: { bn: "নাস্তার প্রয়োজন নেই", en: "No fasting needed" } },
    { id: "t19", cat: "pathology", name: { bn: "CRP (Quantitative)", en: "CRP (Quantitative)" }, price: 450, days: { bn: "প্রতিদিন", en: "Daily" }, prep: { bn: "নাস্তার প্রয়োজন নেই", en: "No fasting needed" } },
    { id: "t20", cat: "special", name: { bn: "ভিটামিন D (25-OH)", en: "Vitamin D (25-OH)" }, price: 2000, days: { bn: "সপ্তাহে ৩ দিন", en: "3 days/week" }, prep: { bn: "নাস্তার প্রয়োজন নেই", en: "No fasting needed" } },
    { id: "t21", cat: "special", name: { bn: "বিটা HCG", en: "Beta HCG" }, price: 900, days: { bn: "প্রতিদিন", en: "Daily" }, prep: { bn: "নাস্তার প্রয়োজন নেই", en: "No fasting needed" } },
    { id: "t22", cat: "special", name: { bn: "সিরাম ইলেক্ট্রোলাইটস", en: "Serum Electrolytes" }, price: 600, days: { bn: "প্রতিদিন", en: "Daily" }, prep: { bn: "নাস্তার প্রয়োজন নেই", en: "No fasting needed" } },
    { id: "t23", cat: "special", name: { bn: "হিমোগ্লোবিন ইলেক্ট্রোফোরেসিস", en: "Haemoglobin Electrophoresis" }, price: 1500, days: { bn: "সপ্তাহে ২ দিন", en: "2 days/week" }, prep: { bn: "নাস্তার প্রয়োজন নেই", en: "No fasting needed" } },
    { id: "t24", cat: "imaging", name: { bn: "এক্স-রে বুক PA (ডিজিটাল)", en: "X-ray Chest PA (Digital)" }, price: 400, days: { bn: "প্রতিদিন", en: "Daily" }, prep: { bn: "রিপোর্ট ৩০ মিনিটে", en: "Report in 30 min" } },
    { id: "t25", cat: "imaging", name: { bn: "আল্ট্রাসনোগ্রাম হল এবডোমেন", en: "Ultrasonogram of Whole Abdomen" }, price: 1500, days: { bn: "প্রতিদিন", en: "Daily" }, prep: { bn: "৮ ঘণ্টা নাস্তা, পূর্ণ মূত্রথলি", en: "8 hrs fasting, full bladder" } },
    { id: "t26", cat: "imaging", name: { bn: "আল্ট্রাসনোগ্রাম লোয়ার এবডোমেন", en: "Ultrasonogram of Lower Abdomen" }, price: 1200, days: { bn: "প্রতিদিন", en: "Daily" }, prep: { bn: "পূর্ণ মূত্রথলি", en: "Full bladder" } },
    { id: "t27", cat: "imaging", name: { bn: "সিটি স্ক্যান ব্রেইন (Plain)", en: "CT Scan Brain (Plain)" }, price: 6000, days: { bn: "প্রতিদিন", en: "Daily" }, prep: { bn: "অ্যাপয়েন্টমেন্ট প্রয়োজন", en: "Appointment required" } },
    { id: "t28", cat: "imaging", name: { bn: "এমআরআই (প্রতি সেগমেন্ট)", en: "MRI (per segment)" }, price: 9000, days: { bn: "প্রতিদিন", en: "Daily" }, prep: { bn: "অ্যাপয়েন্টমেন্ট প্রয়োজন", en: "Appointment required" } },
    { id: "t29", cat: "cardiac", name: { bn: "ইসিজি (ECG)", en: "ECG" }, price: 400, days: { bn: "প্রতিদিন ২৪ ঘণ্টা", en: "Daily, 24 hrs" }, prep: { bn: "রিপোর্ট সাথে সাথে", en: "Instant report" } },
    { id: "t30", cat: "cardiac", name: { bn: "ইকোকার্ডিওগ্রাফি (Echo)", en: "Echocardiography (Echo)" }, price: 2000, days: { bn: "প্রতিদিন", en: "Daily" }, prep: { bn: "অ্যাপয়েন্টমেন্ট প্রয়োজন", en: "Appointment required" } },
    { id: "t31", cat: "cardiac", name: { bn: "ইটিটি (ETT)", en: "Exercise Tolerance Test (ETT)" }, price: 1500, days: { bn: "শনি–বৃহস্পতি", en: "Sat–Thu" }, prep: { bn: "হালকা নাস্তা করবেন", en: "Light meal before" } },
    { id: "t32", cat: "special", name: { bn: "এন্ডোস্কপি (Upper GI)", en: "Endoscopy (Upper GI)" }, price: 4500, days: { bn: "শনি, সোম, বুধ", en: "Sat, Mon, Wed" }, prep: { bn: "১২ ঘণ্টা নাস্তা", en: "12 hrs fasting" } },
    { id: "t33", cat: "special", name: { bn: "কোলনোস্কপি", en: "Colonoscopy" }, price: 5000, days: { bn: "রবি, মঙ্গল", en: "Sun, Tue" }, prep: { bn: "পূর্বে বাওয়েল প্রেপ", en: "Bowel prep beforehand" } },
  ],

  /* ---------- হেলথ প্যাকেজ ---------- */
  packages: [
    {
      id: "basic",
      name: { bn: "বেসিক হেলথ স্ক্রিনিং", en: "Basic Health Screening" },
      price: 1500, oldPrice: 1800,
      items: [
        { bn: "সিবিসি (CBC)", en: "CBC" },
        { bn: "রক্তে সুগার (FBS)", en: "Blood Sugar (FBS)" },
        { bn: "প্রস্রাব R/E", en: "Urine R/E" },
        { bn: "ইসিজি (ECG)", en: "ECG" },
        { bn: "BMI ও ব্লাড প্রেশার চেক", en: "BMI & BP check" },
        { bn: "মেডিসিন বিশেষজ্ঞের কনসালটেশন", en: "Medicine specialist consultation" },
      ],
    },
    {
      id: "diabetes",
      name: { bn: "ডায়াবেটিস কেয়ার প্যাকেজ", en: "Diabetes Care Package" },
      price: 2500, oldPrice: 3100,
      items: [
        { bn: "FBS + 2HBS", en: "FBS + 2HBS" },
        { bn: "HbA1c", en: "HbA1c" },
        { bn: "লিপিড প্রোফাইল", en: "Lipid Profile" },
        { bn: "সিরাম ক্রিয়েটিনিন", en: "Serum Creatinine" },
        { bn: "আল্ট্রাসনোগ্রাম কিডনি-মূত্রথলি", en: "USG KUB" },
        { bn: "ইসিজি + ডায়াবেটোলজিস্ট কনসালটেশন", en: "ECG + diabetologist consultation" },
      ],
    },
    {
      id: "cardiac",
      name: { bn: "কার্ডিয়াক স্ক্রিনিং প্যাকেজ", en: "Cardiac Screening Package" },
      price: 3500, oldPrice: 4200,
      items: [
        { bn: "ইসিজি (ECG)", en: "ECG" },
        { bn: "ইকোকার্ডিওগ্রাফি (Echo)", en: "Echocardiography" },
        { bn: "লিপিড প্রোফাইল", en: "Lipid Profile" },
        { bn: "SGPT ও ক্রিয়েটিনিন", en: "SGPT & Creatinine" },
        { bn: "হার্ট ফেইলিওর রিস্ক অ্যাসেসমেন্ট", en: "Heart failure risk assessment" },
        { bn: "কার্ডিওলজিস্ট কনসালটেশন", en: "Cardiologist consultation" },
      ],
    },
    {
      id: "executive",
      name: { bn: "ফুল বডি চেকআপ (এক্সিকিউটিভ)", en: "Full Body Checkup (Executive)" },
      price: 5500, oldPrice: 6800, popular: true,
      items: [
        { bn: "সিবিসি, FBS, HbA1c", en: "CBC, FBS, HbA1c" },
        { bn: "লিপিড প্রোফাইল", en: "Lipid Profile" },
        { bn: "SGPT, SGOT, ক্রিয়েটিনিন, বিউরিয়া", en: "SGPT, SGOT, Creatinine, Urea" },
        { bn: "থাইরয়েড প্রোফাইল", en: "Thyroid Profile" },
        { bn: "প্রস্রাব R/E", en: "Urine R/E" },
        { bn: "আল্ট্রাসনোগ্রাম হল এবডোমেন", en: "USG whole abdomen" },
        { bn: "ইসিজি + বিশেষজ্ঞ কনসালটেশন", en: "ECG + specialist consultation" },
      ],
    },
  ],

  /* ---------- ডাক্তারদের তালিকা ---------- */
  doctors: [
    {
      id: "d1",
      name: { bn: "ডা. আরিফুল ইসলাম", en: "Dr. Ariful Islam" },
      spec: { bn: "মেডিসিন ও ডায়াবেটোলজি", en: "Medicine & Diabetology" },
      degree: { bn: "MBBS, FCPS (মেডিসিন), MRCP (UK)", en: "MBBS, FCPS (Medicine), MRCP (UK)" },
      days: { bn: "শনি – বৃহস্পতি", en: "Sat – Thu" },
      time: { bn: "বিকাল ৫টা – রাত ৯টা", en: "5:00 PM – 9:00 PM" },
      room: { bn: "চেম্বার রুম: ২০৩", en: "Chamber room: 203" },
      img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=75",
    },
    {
      id: "d2",
      name: { bn: "ডা. ফারজানা হক", en: "Dr. Farzana Haque" },
      spec: { bn: "স্ত্রীরোগ ও প্রসূতি", en: "Gynaecology & Obstetrics" },
      degree: { bn: "MBBS, MS (গাইনি ও প্রসূতি)", en: "MBBS, MS (Gynae & Obs)" },
      days: { bn: "রবি – বৃহস্পতি", en: "Sun – Thu" },
      time: { bn: "সকাল ৯টা – দুপুর ১টা", en: "9:00 AM – 1:00 PM" },
      room: { bn: "চেম্বার রুম: ২০৫", en: "Chamber room: 205" },
      img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=75",
    },
    {
      id: "d3",
      name: { bn: "ডা. মাহমুদ হাসান", en: "Dr. Mahmud Hasan" },
      spec: { bn: "শিশু বিশেষজ্ঞ ও নিওনেটোলজি", en: "Paediatrics & Neonatology" },
      degree: { bn: "MBBS, FCPS (শিশু)", en: "MBBS, FCPS (Paediatrics)" },
      days: { bn: "শনি – মঙ্গল, বৃহস্পতি", en: "Sat – Tue, Thu" },
      time: { bn: "সকাল ১০টা – দুপুর ২টা", en: "10:00 AM – 2:00 PM" },
      room: { bn: "চেম্বার রুম: ২০৭", en: "Chamber room: 207" },
      img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=75",
    },
    {
      id: "d4",
      name: { bn: "ডা. তানভীর আহমেদ", en: "Dr. Tanvir Ahmed" },
      spec: { bn: "অর্থোপেডিক ও ট্রমা সার্জারি", en: "Orthopaedics & Trauma" },
      degree: { bn: "MBBS, MS (অর্থোপেডিক্স)", en: "MBBS, MS (Orthopaedics)" },
      days: { bn: "শনি – বৃহস্পতি", en: "Sat – Thu" },
      time: { bn: "সন্ধ্যা ৬টা – রাত ৮টা", en: "6:00 PM – 8:00 PM" },
      room: { bn: "চেম্বার রুম: ২০৯", en: "Chamber room: 209" },
      img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=75",
    },
  ],

  /* ---------- রোগীদের অভিমত ---------- */
  testimonials: [
    {
      name: { bn: "মোঃ রফিকুল আমিন", en: "Md. Rafiqul Amin" },
      area: { bn: "শাহমখদুম, রাজশাহী", en: "Shaheb Bazar, Rajshahi" },
      rating: 5,
      text: { bn: "ঘরে বসেই সিরিয়াল নিয়েছি, ডাক্তারের চেম্বারে সোজা ঢুকেছি। রিপোর্টও WhatsApp এ পেয়ে গেছি — সময় আর খরচ দুটোই বেঁচেছে।", en: "Booked my serial online and walked straight into the chamber. Report came via WhatsApp — saved both time and money." },
    },
    {
      name: { bn: "সুমাইয়া আক্তার", en: "Sumaiya Akter" },
      area: { bn: "বোয়ালিয়া, রাজশাহী", en: "Boalia, Rajshahi" },
      rating: 5,
      text: { bn: "মায়ের ডায়াবেটিস প্যাকেজ করেছি। মূল্য তালিকা ওয়েবসাইটে দেখেই বুঝেছিলাম খরচ কত হবে — কোনো লুকানো বিল নেই।", en: "Took the diabetes package for my mother. The online price list told us the exact cost — no hidden bills at all." },
    },
    {
      name: { bn: "আব্দুল্লাহ আল মামুন", en: "Abdullah Al Mamun" },
      area: { bn: "মতিহার, রাজশাহী", en: "Motihar, Rajshahi" },
      rating: 4,
      text: { bn: "রাত ১২টায় বাবাকে নিয়ে ইমারজেন্সিতে গেছি — অ্যাম্বুলেন্স টিম মেডিকেল পর্যন্ত দ্রুত শিফটিং করেছে। চিরকৃতজ্ঞ।", en: "Rushed to their emergency at midnight with my father — the ambulance team shifted him to Medical quickly. Grateful." },
    },
    {
      name: { bn: "নুসরাত জাহান", en: "Nusrat Jahan" },
      area: { bn: "কাজলা, রাজশাহী", en: "Kazla, Rajshahi" },
      rating: 5,
      text: { bn: "টেকনিশিয়ান বাসায় এসে রক্ত নিয়ে গেছেন, রিপোর্ট নম্বর দিয়ে অনলাইনেই ডাউনলোড করেছি। খুব পেশাদার সার্ভিস।", en: "The technician collected blood at home and I downloaded the report online with the report ID. Very professional service." },
    },
  ],

  /* ---------- সাধারণ জিজ্ঞাসা ---------- */
  faqs: [
    {
      q: { bn: "রিপোর্ট পেতে কত সময় লাগে?", en: "How long does it take to get a report?" },
      a: { bn: "সাধারণ প্যাথলজি টেস্টের রিপোর্ট সেই দিনেই, হরমোন ও বিশেষ পরীক্ষা ২৪–৪৮ ঘণ্টায় প্রস্তুত হয়। রিপোর্ট নম্বর দিয়ে ওয়েবসাইটের 'রিপোর্ট চেক' সেকশন থেকে যেকোনো সময় স্ট্যাটাস দেখতে ও ডাউনলোড করতে পারবেন।", en: "Routine pathology reports are ready the same day; hormone and special tests take 24–48 hours. Use the 'Report Check' section with your report ID to view status and download anytime." },
    },
    {
      q: { bn: "হোম স্যাম্পল কালেকশনের ফি কত?", en: "What is the home collection fee?" },
      a: { bn: "৳১০০০ বা তদূর্ধ্ব মূল্যের পরীক্ষায় রাজশাহী সিটি করপোরেশন এলাকায় হোম কালেকশন সম্পূর্ণ ফ্রি। এর নিচের বিলে ফি মাত্র ৳১০০। সকাল ৮টা থেকে রাত ৯টা পর্যন্ত নম্বর দিয়ে বুকিং করতে পারেন।", en: "Home collection is completely free within Rajshahi City Corporation for tests of ৳1000 or more; below that the fee is only ৳100. Book from 8 AM to 9 PM." },
    },
    {
      q: { bn: "অ্যাপয়েন্টমেন্ট কিভাবে নিশ্চিত হয়?", en: "How is my appointment confirmed?" },
      a: { bn: "ফর্ম জমা দেওয়ার পর আপনি একটি ট্র্যাকিং আইডি পাবেন এবং ৩০ মিনিটের মধ্যে আমাদের প্রতিনিধি ফোন করে সময় নিশ্চিত করবেন। প্রয়োজনে WhatsApp এও কনফার্মেশন পাঠানো হয়।", en: "After submitting the form you receive a tracking ID, and our representative calls within 30 minutes to confirm the slot. A WhatsApp confirmation is also sent when needed." },
    },
    {
      q: { bn: "কোন কোন পেমেন্ট মেথড গ্রহণ করেন?", en: "Which payment methods do you accept?" },
      a: { bn: "ক্যাশ ছাড়াও বিকাশ, নগদ, রকেট ও কার্ড পেমেন্ট গ্রহণ করা হয়। অনলাইনে অগ্রিম পেমেন্টে ল্যাব বিলে ১০% পর্যন্ত ডিসকাউন্ট প্রযোজ্য হতে পারে (প্যাকেজ অনুযায়ী)।", en: "Besides cash we accept bKash, Nagad, Rocket and card payment. Advance online payment can earn up to 10% discount on lab bills (package dependent)." },
    },
    {
      q: { bn: "বিশেষজ্ঞ ডাক্তারদের সিরিয়াল কিভাবে নেব?", en: "How do I get a specialist doctor's serial?" },
      a: { bn: "ওয়েবসাইটের 'ডাক্তারদের তালিকা' সেকশনে প্রত্যেক বিশেষজ্ঞের আসার দিন ও সময় দেওয়া আছে। অ্যাপয়েন্টমেন্ট ফর্মে ডিপার্টমেন্ট ও ডাক্তার নির্বাচন করে জমা দিলেই সিরিয়াল বুক হবে।", en: "Each specialist's visiting days and hours are listed in the 'Doctors' section. Choose the department and doctor in the appointment form and submit to book the serial." },
    },
    {
      q: { bn: "ইমারজেন্সি সেবা কি সত্যিই ২৪ ঘণ্টা?", en: "Is emergency care really 24/7?" },
      a: { bn: "হ্যাঁ। ইমারজেন্সি কাউন্টার, ইসিজি ও অ্যাম্বুলেন্স সার্বক্ষণিক সচল। জরুরি প্রয়োজনে সরাসরি ইমারজেন্সি হটলাইনে কল করুন অথবা লক্ষীপুর মোড়ের আমাদের প্রাঙ্গণে আসুন।", en: "Yes. The emergency counter, ECG and ambulance operate round the clock. In urgent need call the emergency hotline directly or come to our Laxmipur More premises." },
    },
  ],

  /* ---------- রিপোর্ট চেক (ডেমো) ---------- */
  demoReports: [
    {
      id: "PC-2025-1042",
      patient: { bn: "মোঃ রফিকুল ইসলাম", en: "Md. Rafiqul Islam" },
      tests: { bn: "CBC, রক্তে সুগার (FBS)", en: "CBC, Blood Sugar (FBS)" },
      status: "ready",
      date: "2025-11-10",
    },
    {
      id: "PC-2025-1087",
      patient: { bn: "সুমাইয়া আক্তার", en: "Sumaiya Akter" },
      tests: { bn: "থাইরয়েড প্রোফাইল", en: "Thyroid Profile" },
      status: "processing",
      date: "2025-11-13",
    },
  ],

  /* ---------- চলার সময়সূচি ---------- */
  hours: [
    { day: { bn: "শনি – বৃহস্পতি", en: "Sat – Thu" }, time: { bn: "সকাল ৮টা – রাত ৯টা", en: "8:00 AM – 9:00 PM" } },
    { day: { bn: "শুক্রবার", en: "Friday" }, time: { bn: "সকাল ৮টা – ১২টা, বিকাল ৪টা – রাত ৯টা", en: "8:00 AM – 12 PM, 4:00 PM – 9:00 PM" } },
    { day: { bn: "ইমারজেন্সি ও অ্যাম্বুলেন্স", en: "Emergency & Ambulance" }, time: { bn: "২৪ ঘণ্টা সচল", en: "24/7 open" } },
  ],

  /* ---------- অ্যাপয়েন্টমেন্ট ফর্মের ডিপার্টমেন্ট ---------- */
  departments: [
    { bn: "মেডিসিন ও ডায়াবেটোলজি", en: "Medicine & Diabetology" },
    { bn: "স্ত্রীরোগ ও প্রসূতি", en: "Gynaecology & Obstetrics" },
    { bn: "শিশু বিশেষজ্ঞ", en: "Paediatrics" },
    { bn: "অর্থোপেডিক ও ট্রমা", en: "Orthopaedics & Trauma" },
    { bn: "কার্ডিয়াক সেবা", en: "Cardiac Care" },
    { bn: "ডায়াগনস্টিক টেস্ট বুকিং", en: "Diagnostic Test Booking" },
    { bn: "হোম স্যাম্পল কালেকশন", en: "Home Sample Collection" },
  ],
};

/* ═══════════════ অংশ ৩/৫ — I18N / ভাষা ব্যবস্থাপনা (বাংলা ⇄ English) ═══════════════ */

/* ============================================================
   পদ্মা কেয়ার — i18n / ভাষা ব্যবস্থাপনা (বাংলা ⇄ English)
   ------------------------------------------------------------
   • স্ট্যাটিক টেক্সটের জন্য data-i18n="key" attribute
   • placeholder এর জন্য data-i18n-ph="key"
   • aria-label এর জন্য data-i18n-aria="key"
   • <title>, meta description ও <html lang> স্বয়ংক্রিয়ভাবে বদলায়
   • ভাষা পছন্দ localStorage এ সেভ হয়
   ============================================================ */

window.PADMA_I18N = {

  /* ---------------- বাংলা ---------------- */
  bn: {
    "doc.title": "পদ্মা কেয়ার ক্লিনিক ও ডায়াগনস্টিক সেন্টার, রাজশাহী | আপনার সুস্থতা — আমাদের অঙ্গীকার",
    "doc.desc": "রাজশাহীর আস্থার ক্লিনিক ও ডায়াগনস্টিক সেন্টার। অনলাইন অ্যাপয়েন্টমেন্ট, ডিজিটাল রিপোর্ট, স্বচ্ছ মূল্য তালিকা ও হোম স্যাম্পল কালেকশন।",

    "nav.home": "হোম",
    "nav.why": "কেন আমরা",
    "nav.services": "সেবাসমূহ",
    "nav.prices": "মূল্য তালিকা",
    "nav.packages": "প্যাকেজ",
    "nav.doctors": "ডাক্তারদের তালিকা",
    "nav.report": "রিপোর্ট চেক",
    "nav.contact": "যোগাযোগ",
    "nav.cta": "অ্যাপয়েন্টমেন্ট নিন",
    "nav.menu": "মেনু",

    "top.call": "হটলাইন",
    "top.emergency": "ইমারজেন্সি ২৪/৭",
    "top.hours": "শনি–বৃহস্পতি: সকাল ৮টা – রাত ৯টা",

    "hero.badge": "রাজশাহীর আস্থার ক্লিনিক ও ডায়াগনস্টিক সেন্টার",
    "hero.slogan1": "আপনার সুস্থতা —",
    "hero.slogan2": "আমাদের অঙ্গীকার",
    "hero.sub": "আধুনিক ল্যাব, বিশেষজ্ঞ চিকিৎসক আর ডিজিটাল রিপোর্ট — সব এক ছাদের নিচে। এখন ঘরে বসেই অ্যাপয়েন্টমেন্ট নিন ও রিপোর্ট চেক করুন।",
    "hero.cta1": "অ্যাপয়েন্টমেন্ট নিন",
    "hero.cta2": "মূল্য তালিকা দেখুন",
    "hero.imgtag1": "অভিজ্ঞ রেডিওলজিস্ট প্যানেল",
    "hero.imgtag2": "ডিজিটাল রিপোর্ট ২৪ ঘণ্টায়",
    "hero.imgtag3": "WHO স্ট্যান্ডার্ড ল্যাব",

    "ticker.label": "নোটিশ",

    "why.kicker": "ওয়েবসাইট কী সমাধান দেয়",
    "why.title": "যে ৬টি সমস্যার সমাধান এই ওয়েবসাইট",
    "why.sub": "রোগীর সুবিধা আর প্রতিষ্ঠানের ব্যবসায়িক প্রবৃদ্ধি — দুটোই যাচাই করে সাজানো প্রতিটি সেকশন।",

    "services.kicker": "সেবাসমূহ",
    "services.title": "আধুনিক রোগ নির্ণয় ও চিকিৎসা সেবা",
    "services.sub": "রাজশাহীর মানুষের জন্য আন্তর্জাতিক মানের ডায়াগনস্টিক ও ক্লিনিক সেবা।",
    "services.more": "বিস্তারিত জানুন",

    "prices.kicker": "স্বচ্ছ মূল্য",
    "prices.title": "পরীক্ষার মূল্য তালিকা",
    "prices.sub": "রাজশাহী অঞ্চলের রেফারেন্স মূল্য — আগেই জানুন খরচ, ভুল বোঝাবুঝি নেই।",
    "prices.search": "পরীক্ষার নাম লিখে খুঁজুন...",
    "prices.all": "সব",
    "prices.test": "পরীক্ষার নাম",
    "prices.cat": "বিভাগ",
    "prices.fee": "মূল্য",
    "prices.prep": "প্রস্তুতি",
    "prices.book": "বুক করুন",
    "prices.note": "* মূল্য পরিবর্তনশীল — সর্বশেষ মূল্য ও ডিসকাউন্ট জানতে হটলাইনে কল করুন।",
    "prices.found": "টি পরীক্ষা পাওয়া গেছে",
    "prices.none": "দুঃখিত, কোনো পরীক্ষা খুঁজে পাওয়া যায়নি। হটলাইনে কল করে জানুন।",
    "prices.loading": "মূল্য তালিকা লোড হচ্ছে...",

    "packages.kicker": "হেলথ প্যাকেজ",
    "packages.title": "সাশ্রয়ী স্বাস্থ্য পরীক্ষা প্যাকেজ",
    "packages.sub": "পরিবারের সবার জন্য একসাথে বেশি পরীক্ষা, কম খরচে।",
    "packages.popular": "সবচেয়ে জনপ্রিয়",
    "packages.includes": "প্যাকেজে যা যা আছে",
    "packages.save": "সাশ্রয়",
    "packages.book": "এই প্যাকেজ বুক করুন",

    "doctors.kicker": "বিশেষজ্ঞ প্যানেল",
    "doctors.title": "ডাক্তারদের তালিকা ও চেম্বারের সময়",
    "doctors.sub": "সঠিক বিশেষজ্ঞ বেছে নিন, অনলাইনেই সিরিয়াল বুক করুন।",
    "doctors.book": "সিরিয়াল নিন",

    "homebanner.title": "রাজশাহী সিটির যেকোনো এলাকায় স্যাম্পল সংগ্রহ",
    "homebanner.sub": "৳১০০০+ পরীক্ষায় ফি সম্পূর্ণ ফ্রি — প্রশিক্ষিত নার্স-টেকনিশিয়ান, সন্ধ্যা ৯টা পর্যন্ত।",
    "homebanner.cta": "নম্বর দিন, আমরা যাব",

    "report.kicker": "অনলাইন রিপোর্ট",
    "report.title": "রিপোর্ট চেক করুন",
    "report.sub": "SMS বা হোয়াটসঅ্যাপে পাওয়া রিপোর্ট নম্বর দিন — স্ট্যাটাস ও রিপোর্ট সাথে সাথে।",
    "report.ph": "রিপোর্ট নম্বর (যেমন: PC-2025-1042)",
    "report.btn": "চেক করুন",
    "report.checking": "চেক করা হচ্ছে...",
    "report.ready": "রিপোর্ট প্রস্তুত",
    "report.processing": "প্রসেসিং চলছে",
    "report.patient": "রোগীর নাম",
    "report.tests": "পরীক্ষা",
    "report.date": "সংগ্রহের তারিখ",
    "report.download": "রিপোর্ট ডাউনলোড করুন",
    "report.notfound": "এই নম্বরে কোনো রিপোর্ট খুঁজে পাওয়া যায়নি। নম্বরটি যাচাই করুন বা হটলাইনে কল করুন।",
    "report.demo": "ডেমো নম্বর: PC-2025-1042 (প্রস্তুত), PC-2025-1087 (প্রসেসিং)",
    "report.demoMode": "ডেমো ডাটা দেখানো হচ্ছে — config.js এ Firebase/Google Sheets যুক্ত করলে সরাসরি আসল রিপোর্ট ডেটাবেজ থেকে আসবে।",

    "appt.kicker": "অনলাইন বুকিং",
    "appt.title": "অ্যাপয়েন্টমেন্ট নিন",
    "appt.sub": "ফর্মটি পূরণ করুন — আমাদের প্রতিনিধি ৩০ মিনিটের মধ্যে কল করে সময় নিশ্চিত করবেন।",
    "appt.name": "রোগীর নাম *",
    "appt.nameph": "পুরো নাম লিখুন",
    "appt.phone": "মোবাইল নম্বর *",
    "appt.phoneph": "01XXXXXXXXX",
    "appt.age": "বয়স",
    "appt.gender": "লিঙ্গ",
    "appt.male": "পুরুষ",
    "appt.female": "মহিলা",
    "appt.other": "অন্যান্য",
    "appt.dept": "ডিপার্টমেন্ট / সেবা *",
    "appt.deptph": "ডিপার্টমেন্ট নির্বাচন করুন",
    "appt.doctor": "পছন্দের ডাক্তার (ঐচ্ছিক)",
    "appt.doctorph": "ডাক্তার নির্বাচন করুন",
    "appt.date": "পছন্দের তারিখ",
    "appt.slot": "পছন্দের সময়",
    "appt.morning": "সকাল (৮টা–১২টা)",
    "appt.evening": "বিকাল/সন্ধ্যা (৪টা–৯টা)",
    "appt.msg": "সমস্যা সংক্ষেপে (ঐচ্ছিক)",
    "appt.msgph": "যেমন: জ্বর ৩ দিন ধরে...",
    "appt.submit": "অ্যাপয়েন্টমেন্ট জমা দিন",
    "appt.submitting": "জমা হচ্ছে...",
    "appt.success": "অ্যাপয়েন্টমেন্ট সফলভাবে জমা হয়েছে!",
    "appt.successId": "আপনার ট্র্যাকিং আইডি",
    "appt.successNote": "ট্র্যাকিং আইডিটি সংরক্ষণ করুন। আমাদের প্রতিনিধি শীঘ্রই কল করবেন। জরুরি প্রয়োজনে হটলাইনে কল করুন।",
    "appt.errName": "অনুগ্রহ করে রোগীর নাম লিখুন",
    "appt.errPhone": "সঠিক মোবাইল নম্বর দিন (01XXXXXXXXX)",
    "appt.errDept": "অনুগ্রহ করে ডিপার্টমেন্ট নির্বাচন করুন",
    "appt.step1t": "ফর্মটি পূরণ করুন",
    "appt.step1d": "নাম, মোবাইল নম্বর ও প্রয়োজনীয় ডিপার্টমেন্ট নির্বাচন করুন — মাত্র ১ মিনিট।",
    "appt.step2t": "কনফার্মেশন কল পান",
    "appt.step2d": "জমা দেওয়ার ৩০ মিনিটের মধ্যে আমাদের প্রতিনিধি কল করে সময় নিশ্চিত করবেন।",
    "appt.step3t": "নির্ধারিত সময়ে আসুন",
    "appt.step3d": "ট্র্যাকিং আইডি দেখিয়ে সিরিয়াল অনুযায়ী চেম্বার বা ল্যাবে প্রবেশ করুন।",
    "appt.offline": "নোট: ক্লাউড স্টোরেজ কনফিগার করা নেই, তাই ডাটা এখন ব্রাউজারের localStorage এ সেভ হয়েছে (ডেমো মোড)।",
    "appt.anydoctor": "যেকোনো ডাক্তার",

    "testi.kicker": "রোগীদের অভিমত",
    "testi.title": "রাজশাহীর মানুষ যা বলছেন",

    "faq.kicker": "সাধারণ জিজ্ঞাসা",
    "faq.title": "প্রশ্ন ও উত্তর",

    "contact.kicker": "যোগাযোগ ও লোকেশন",
    "contact.title": "আমাদের ঠিকানা ও ম্যাপ",
    "contact.sub": "লক্ষীপুর মোড়, রাজশাহী — শহরের কেন্দ্র থেকে মাত্র ১০ মিনিট।",
    "contact.address": "ঠিকানা",
    "contact.hotline": "হটলাইন",
    "contact.emergency": "ইমারজেন্সি (২৪/৭)",
    "contact.email": "ইমেইল",
    "contact.hours": "খোলা থাকার সময়",
    "contact.dir": "গুগল ম্যাপে দিকনির্দেশনা",
    "contact.callnow": "এখনই কল করুন",

    "footer.about": "রাজশাহীর বুকে আন্তর্জাতিক মানের ডায়াগনস্টিক ও ক্লিনিক সেবা। স্বচ্ছ মূল্য, ডিজিটাল রিপোর্ট আর অনলাইন বুকিং — স্বাস্থ্যসেবায় আস্থার নতুন মানদণ্ড।",
    "footer.quick": "দ্রুত লিংক",
    "footer.services": "জনপ্রিয় পরীক্ষা",
    "footer.contact": "যোগাযোগ",
    "footer.hours": "সময়সূচি",
    "footer.rights": "সর্বস্বত্ব সংরক্ষিত।",
    "footer.made": "রাজশাহীতে তৈরি — সাধারণ মানুষের সেবায়",
    "footer.disclaimer": "এই ওয়েবসাইট একটি ডেমো প্রজেক্ট; নাম, ফোন ও তথ্যগুলো প্রয়োজনমতো পরিবর্তনযোগ্য।",
    "footer.test1": "সিবিসি (CBC)",
    "footer.test2": "আল্ট্রাসনোগ্রাম",
    "footer.test3": "ইকোকার্ডিওগ্রাফি",
    "footer.test4": "থাইরয়েড প্রোফাইল",
    "footer.test5": "ফুল বডি চেকআপ",
    "footer.test6": "ডেঙ্গু NS1",

    "misc.scrollTop": "উপরে যান",
    "misc.whatsapp": "WhatsApp এ কথা বলুন",
    "misc.callUs": "কল করুন",
    "misc.taka": "৳",
    "misc.langLabel": "ভাষা পরিবর্তন",
  },

  /* ---------------- English ---------------- */
  en: {
    "doc.title": "Padma Care Clinic & Diagnostic Center, Rajshahi | Your Health — Our Commitment",
    "doc.desc": "Rajshahi's trusted clinic & diagnostic center. Online appointments, digital reports, transparent pricing and home sample collection.",

    "nav.home": "Home",
    "nav.why": "Why Us",
    "nav.services": "Services",
    "nav.prices": "Price List",
    "nav.packages": "Packages",
    "nav.doctors": "Doctors",
    "nav.report": "Report Check",
    "nav.contact": "Contact",
    "nav.cta": "Book Appointment",
    "nav.menu": "Menu",

    "top.call": "Hotline",
    "top.emergency": "Emergency 24/7",
    "top.hours": "Sat–Thu: 8 AM – 9 PM",

    "hero.badge": "Rajshahi's Trusted Clinic & Diagnostic Center",
    "hero.slogan1": "Your Health —",
    "hero.slogan2": "Our Commitment",
    "hero.sub": "Modern lab, specialist consultants and digital reports — all under one roof. Book appointments and check reports online, from home.",
    "hero.cta1": "Book Appointment",
    "hero.cta2": "View Price List",
    "hero.imgtag1": "Expert radiology panel",
    "hero.imgtag2": "Digital reports in 24 hrs",
    "hero.imgtag3": "WHO-standard lab",

    "ticker.label": "Notice",

    "why.kicker": "What This Website Solves",
    "why.title": "6 Problems This Website Solves",
    "why.sub": "Every section is designed around patient convenience and real business growth.",

    "services.kicker": "Our Services",
    "services.title": "Advanced Diagnostics & Clinical Care",
    "services.sub": "International-standard diagnostic and clinic services for the people of Rajshahi.",
    "services.more": "Learn more",

    "prices.kicker": "Transparent Pricing",
    "prices.title": "Test Price List",
    "prices.sub": "Reference prices for the Rajshahi region — know your cost upfront.",
    "prices.search": "Search a test by name...",
    "prices.all": "All",
    "prices.test": "Test Name",
    "prices.cat": "Category",
    "prices.fee": "Price",
    "prices.prep": "Preparation",
    "prices.book": "Book",
    "prices.note": "* Prices are subject to change — call the hotline for the latest price and discounts.",
    "prices.found": "tests found",
    "prices.none": "Sorry, no test matched your search. Please call the hotline.",
    "prices.loading": "Loading price list...",

    "packages.kicker": "Health Packages",
    "packages.title": "Affordable Health Checkup Packages",
    "packages.sub": "More tests together, at a lower cost — for the whole family.",
    "packages.popular": "Most Popular",
    "packages.includes": "Package includes",
    "packages.save": "Save",
    "packages.book": "Book This Package",

    "doctors.kicker": "Specialist Panel",
    "doctors.title": "Doctor List & Chamber Hours",
    "doctors.sub": "Choose the right specialist and book your serial online.",
    "doctors.book": "Get Serial",

    "homebanner.title": "Sample collection anywhere in Rajshahi city",
    "homebanner.sub": "Completely free for tests of ৳1000+ — trained nurses & technicians, until 9 PM.",
    "homebanner.cta": "Give us your number, we'll visit",

    "report.kicker": "Online Reports",
    "report.title": "Check Your Report",
    "report.sub": "Enter the report ID from your SMS or WhatsApp — see status instantly.",
    "report.ph": "Report ID (e.g. PC-2025-1042)",
    "report.btn": "Check",
    "report.checking": "Checking...",
    "report.ready": "Report Ready",
    "report.processing": "Processing",
    "report.patient": "Patient",
    "report.tests": "Tests",
    "report.date": "Collection date",
    "report.download": "Download Report",
    "report.notfound": "No report found for this ID. Please verify the number or call our hotline.",
    "report.demo": "Demo IDs: PC-2025-1042 (ready), PC-2025-1087 (processing)",
    "report.demoMode": "Showing demo data — add Firebase / Google Sheets in config.js to fetch real reports from your database.",

    "appt.kicker": "Online Booking",
    "appt.title": "Book an Appointment",
    "appt.sub": "Fill in the form — our representative will call within 30 minutes to confirm your slot.",
    "appt.name": "Patient Name *",
    "appt.nameph": "Enter full name",
    "appt.phone": "Mobile Number *",
    "appt.phoneph": "01XXXXXXXXX",
    "appt.age": "Age",
    "appt.gender": "Gender",
    "appt.male": "Male",
    "appt.female": "Female",
    "appt.other": "Other",
    "appt.dept": "Department / Service *",
    "appt.deptph": "Select a department",
    "appt.doctor": "Preferred Doctor (optional)",
    "appt.doctorph": "Select a doctor",
    "appt.date": "Preferred Date",
    "appt.slot": "Preferred Time",
    "appt.morning": "Morning (8 AM – 12 PM)",
    "appt.evening": "Evening (4 PM – 9 PM)",
    "appt.msg": "Describe your problem (optional)",
    "appt.msgph": "e.g. fever for 3 days...",
    "appt.submit": "Submit Appointment",
    "appt.submitting": "Submitting...",
    "appt.success": "Appointment submitted successfully!",
    "appt.successId": "Your Tracking ID",
    "appt.successNote": "Please save this ID. Our representative will call you shortly. For urgent needs, call the hotline.",
    "appt.errName": "Please enter the patient's name",
    "appt.errPhone": "Enter a valid mobile number (01XXXXXXXXX)",
    "appt.errDept": "Please select a department",
    "appt.step1t": "Fill in the form",
    "appt.step1d": "Name, mobile number and department — takes only 1 minute.",
    "appt.step2t": "Get a confirmation call",
    "appt.step2d": "Our representative calls within 30 minutes to confirm your slot.",
    "appt.step3t": "Arrive on schedule",
    "appt.step3d": "Show your tracking ID and enter the chamber or lab per your serial.",
    "appt.offline": "Note: cloud storage is not configured, so the data was saved in your browser's localStorage (demo mode).",
    "appt.anydoctor": "Any doctor",

    "testi.kicker": "Patient Voices",
    "testi.title": "What People of Rajshahi Say",

    "faq.kicker": "FAQ",
    "faq.title": "Questions & Answers",

    "contact.kicker": "Contact & Location",
    "contact.title": "Our Address & Map",
    "contact.sub": "Laxmipur More, Rajshahi — only 10 minutes from the city center.",
    "contact.address": "Address",
    "contact.hotline": "Hotline",
    "contact.emergency": "Emergency (24/7)",
    "contact.email": "Email",
    "contact.hours": "Opening Hours",
    "contact.dir": "Get Directions on Google Maps",
    "contact.callnow": "Call Now",

    "footer.about": "International-standard diagnostic & clinic services in the heart of Rajshahi. Transparent pricing, digital reports and online booking — a new benchmark of trust in healthcare.",
    "footer.quick": "Quick Links",
    "footer.services": "Popular Tests",
    "footer.contact": "Contact",
    "footer.hours": "Opening Hours",
    "footer.rights": "All rights reserved.",
    "footer.made": "Made in Rajshahi — serving the people",
    "footer.disclaimer": "This website is a demo project; names, numbers and details are editable to fit your clinic.",
    "footer.test1": "CBC",
    "footer.test2": "Ultrasonogram",
    "footer.test3": "Echocardiography",
    "footer.test4": "Thyroid Profile",
    "footer.test5": "Full Body Checkup",
    "footer.test6": "Dengue NS1",

    "misc.scrollTop": "Scroll to top",
    "misc.whatsapp": "Chat on WhatsApp",
    "misc.callUs": "Call us",
    "misc.taka": "৳",
    "misc.langLabel": "Switch language",
  },
};

/* ============================================================
   ভাষা ইঞ্জিন — Lang অবজেক্ট
   ============================================================ */
(function () {
  const STORE_KEY = "padma_lang";

  const Lang = {
    current: null,

    detect() {
      let saved = null;
      try { saved = localStorage.getItem(STORE_KEY); } catch (e) { /* ignore */ }
      const cfg = (window.PADMA_CONFIG && window.PADMA_CONFIG.runtime) || {};
      this.current = (saved === "bn" || saved === "en") ? saved : (cfg.defaultLang || "bn");
      return this.current;
    },

    t(key) {
      const dict = window.PADMA_I18N[this.current] || window.PADMA_I18N.bn;
      return dict[key] || window.PADMA_I18N.bn[key] || key;
    },

    pick(obj) {
      // ডাটা অবজেক্টের বহুভাষিক ফিল্ড থেকে বর্তমান ভাষার টেক্সট নেয়
      if (obj == null) return "";
      if (typeof obj === "string") return obj;
      return obj[this.current] || obj.bn || "";
    },

    digits(strOrNum) {
      // বাংলা মোডে সংখ্যা বাংলা অংকে রূপান্তর
      const s = String(strOrNum);
      if (this.current !== "bn") return s;
      const map = { "0": "০", "1": "১", "2": "২", "3": "৩", "4": "৪", "5": "৫", "6": "৬", "7": "৭", "8": "৮", "9": "৯" };
      return s.replace(/[0-9]/g, (d) => map[d]);
    },

    price(num) {
      return "৳" + this.digits(Number(num).toLocaleString("en-IN"));
    },

    applyStatic(root) {
      const scope = root || document;
      scope.querySelectorAll("[data-i18n]").forEach((el) => {
        el.innerHTML = this.t(el.getAttribute("data-i18n"));
      });
      scope.querySelectorAll("[data-i18n-ph]").forEach((el) => {
        el.setAttribute("placeholder", this.t(el.getAttribute("data-i18n-ph")));
      });
      scope.querySelectorAll("[data-i18n-aria]").forEach((el) => {
        el.setAttribute("aria-label", this.t(el.getAttribute("data-i18n-aria")));
      });
      document.documentElement.setAttribute("lang", this.current === "bn" ? "bn" : "en");
      document.body.classList.toggle("lang-bn", this.current === "bn");
      document.body.classList.toggle("lang-en", this.current === "en");
      const title = document.querySelector("title");
      if (title) title.textContent = this.t("doc.title");
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute("content", this.t("doc.desc"));
      document.dispatchEvent(new CustomEvent("lang:changed", { detail: { lang: this.current } }));
    },

    set(lang) {
      this.current = (lang === "en") ? "en" : "bn";
      try { localStorage.setItem(STORE_KEY, this.current); } catch (e) { /* ignore */ }
      this.applyStatic();
    },

    toggle() {
      this.set(this.current === "bn" ? "en" : "bn");
    },
  };

  window.PADMA_LANG = Lang;
})();

/* ═══════════════ অংশ ৪/৫ — DATA API (ফ্রি ডাটা স্টোরেজ ফেচিং লেয়ার) ═══════════════ */

/* ============================================================
   পদ্মা কেয়ার — DATA LAYER (ফ্রি ডাটা স্টোরেজ ফেচিং)
   ------------------------------------------------------------
   ডাটা পড়া ও লেখার একক জায়গা। অগ্রাধিকার ক্রম:
     ১. Firebase Realtime Database (script.js এর অংশ ১ এ সেটআপ থাকলে)
     ২. Google Sheets via Apps Script Web App (সেটআপ থাকলে)
     ৩. বিল্ট-ইন ডিফল্ট ডাটা / localStorage (ডেমো মোড)
   ফলে ইন্টারনেট না থাকলেও সাইট সম্পূর্ণ কাজ করে।
   ============================================================ */

(function () {
  const cfg = (window.PADMA_CONFIG && window.PADMA_CONFIG.storage) || {};
  const FB = (cfg.firebaseDatabaseURL || "").trim().replace(/\/+$/, "");
  const GAS = (cfg.googleAppsScriptURL || "").trim();
  const HAS_FB = FB.length > 0;
  const HAS_GAS = GAS.length > 0;

  function genId(prefix) {
    const d = new Date();
    const stamp = d.getFullYear() + String(d.getMonth() + 1).padStart(2, "0") + String(d.getDate()).padStart(2, "0");
    const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
    return `${prefix}-${stamp}-${rand}`;
  }

  function localSave(key, record) {
    try {
      const arr = JSON.parse(localStorage.getItem(key) || "[]");
      arr.push(record);
      localStorage.setItem(key, JSON.stringify(arr));
    } catch (e) { /* storage full / disabled */ }
  }

  function normalizeList(raw) {
    // Firebase object-of-objects কে array তে রূপান্তর
    if (Array.isArray(raw)) return raw;
    if (raw && typeof raw === "object") return Object.values(raw);
    return null;
  }

  const DataAPI = {

    /** ক্লাউড স্টোরেজ কনফিগার করা আছে কি না */
    hasRemote: HAS_FB || HAS_GAS,

    /** কোন মোডে চলছে তার লেবেল */
    mode() {
      if (HAS_FB) return "firebase";
      if (HAS_GAS) return "google-sheets";
      return "demo";
    },

    /* ---------- READ: কালেকশন ফেচ ---------- */
    async getCollection(name) {
      const defaults = (window.PADMA_DEFAULT_DATA && window.PADMA_DEFAULT_DATA[name]) || [];

      // ১) Firebase Realtime Database
      if (HAS_FB) {
        try {
          const res = await fetch(`${FB}/${name}.json?_=${Date.now()}`, { cache: "no-store" });
          if (res.ok) {
            const raw = await res.json();
            const list = normalizeList(raw);
            if (list && list.length) return { data: list, source: "firebase" };
          }
        } catch (e) { console.warn("[DataAPI] Firebase read failed:", name, e); }
      }

      // ২) Google Sheets (Apps Script)
      if (HAS_GAS) {
        try {
          const res = await fetch(`${GAS}?action=list&collection=${encodeURIComponent(name)}`, { cache: "no-store" });
          if (res.ok) {
            const raw = await res.json();
            const list = normalizeList(raw);
            if (list && list.length) return { data: list, source: "google-sheets" };
          }
        } catch (e) { console.warn("[DataAPI] Sheets read failed:", name, e); }
      }

      // ৩) বিল্ট-ইন ডিফল্ট
      return { data: defaults, source: "default" };
    },

    /* ---------- WRITE: ফর্ম সাবমিশন ---------- */
    async submitForm(kind, payload) {
      const record = Object.assign({}, payload, {
        id: genId(kind === "appointment" ? "APPT" : "MSG"),
        kind,
        createdAt: new Date().toISOString(),
        ua: navigator.userAgent.slice(0, 180),
      });

      const stored = [];
      let offline = true;

      // localStorage এ সবসময় মিরর কপি (অফলাইন কিউ)
      localSave("padma_submissions", record);

      // ১) Firebase Realtime Database
      if (HAS_FB) {
        try {
          const res = await fetch(`${FB}/${kind}s/${record.id}.json`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(record),
          });
          if (res.ok) { stored.push("firebase"); offline = false; }
        } catch (e) { console.warn("[DataAPI] Firebase write failed:", e); }
      }

      // ২) Google Sheets — FormData পাঠালে CORS preflight হয় না
      if (HAS_GAS) {
        try {
          const fd = new FormData();
          fd.append("payload", JSON.stringify(record));
          await fetch(GAS, { method: "POST", body: fd, redirect: "follow" });
          stored.push("google-sheets");
          offline = false;
        } catch (e) { console.warn("[DataAPI] Sheets write failed:", e); }
      }

      return { ok: true, id: record.id, record, stored, offline };
    },

    /* ---------- READ: রিপোর্ট চেক ---------- */
    async checkReport(reportId) {
      const id = String(reportId || "").trim();
      if (!id) return null;

      // ১) Firebase
      if (HAS_FB) {
        try {
          const res = await fetch(`${FB}/reports/${encodeURIComponent(id)}.json`, { cache: "no-store" });
          if (res.ok) {
            const raw = await res.json();
            if (raw) return Object.assign({}, raw, { source: "firebase" });
          }
        } catch (e) { console.warn("[DataAPI] report lookup failed:", e); }
      }

      // ২) Google Sheets
      if (HAS_GAS) {
        try {
          const res = await fetch(`${GAS}?action=report&id=${encodeURIComponent(id)}`, { cache: "no-store" });
          if (res.ok) {
            const raw = await res.json();
            if (raw && raw.id) return Object.assign({}, raw, { source: "google-sheets" });
          }
        } catch (e) { /* ignore */ }
      }

      // ৩) ডেমো রিপোর্ট
      const demos = (window.PADMA_DEFAULT_DATA && window.PADMA_DEFAULT_DATA.demoReports) || [];
      const demo = demos.find((r) => r.id.toLowerCase() === id.toLowerCase());
      return demo ? Object.assign({}, demo, { source: "demo" }) : null;
    },

    /** স্টোরেজ মোডের ব্যাজ (ফুটার/রিপোর্ট সেকশনে দেখানোর জন্য) */
    modeLabel() {
      const map = {
        "firebase": "Firebase Realtime DB",
        "google-sheets": "Google Sheets",
        "demo": "Demo (localStorage)",
      };
      return map[this.mode()];
    },
  };

  window.DataAPI = DataAPI;
})();

/* ═══════════════ অংশ ৫/৫ — MAIN UI LOGIC (রেন্ডার, অ্যানিমেশন, ফর্ম) ═══════════════ */

/* ============================================================
   পদ্মা কেয়ার — MAIN UI LOGIC
   ------------------------------------------------------------
   • ডাইনামিক সেকশনগুলো DataAPI দিয়ে ফেচ করে রেন্ডার করে
   • স্টিকি নেভিগেশন, স্ক্রল-স্পাই, মোবাইল মেনু
   • Scroll-to-top (Hero পার হলে দেখা যায়)
   • IntersectionObserver ভিত্তিক reveal অ্যানিমেশন + কাউন্টার
   • মূল্য তালিকার সার্চ/ফিল্টার, রিপোর্ট চেক, ফর্ম সাবমিশন
   ============================================================ */

(function () {
  "use strict";

  const $ = (s, sc) => (sc || document).querySelector(s);
  const $$ = (s, sc) => Array.from((sc || document).querySelectorAll(s));
  const Lang = window.PADMA_LANG;
  const DataAPI = window.DataAPI;
  const CFG = window.PADMA_CONFIG;
  const DEF = window.PADMA_DEFAULT_DATA;

  /* ---------------- SVG আইকন লাইব্রেরি ---------------- */
  const S = 'stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
  const ICONS = {
    booking: '<svg viewBox="0 0 24 24" ' + S + '><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M9 16l2 2 4-4"/></svg>',
    report: '<svg viewBox="0 0 24 24" ' + S + '><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M12 18v-6M9 15l3 3 3-3"/></svg>',
    price: '<svg viewBox="0 0 24 24" ' + S + '><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><circle cx="7" cy="7" r="1.2"/></svg>',
    home: '<svg viewBox="0 0 24 24" ' + S + '><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>',
    doctor: '<svg viewBox="0 0 24 24" ' + S + '><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6 6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>',
    emergency: '<svg viewBox="0 0 24 24" ' + S + '><path d="M10 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h3l3-4h5v4"/><path d="M13 5v4"/><path d="M17 18h2a2 2 0 0 0 2-2v-4"/><circle cx="8" cy="18" r="2"/><circle cx="17" cy="18" r="2"/><path d="M10 18h5"/></svg>',
    flask: '<svg viewBox="0 0 24 24" ' + S + '><path d="M10 2v7.5L4.5 19a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L14 9.5V2"/><path d="M8.5 2h7M7 16h10"/></svg>',
    scan: '<svg viewBox="0 0 24 24" ' + S + '><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><circle cx="12" cy="12" r="3.2"/></svg>',
    heart: '<svg viewBox="0 0 24 24" ' + S + '><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7z"/></svg>',
    drop: '<svg viewBox="0 0 24 24" ' + S + '><path d="M12 2.7s6.5 6.7 6.5 11.3a6.5 6.5 0 0 1-13 0C5.5 9.4 12 2.7 12 2.7z"/></svg>',
    pulse: '<svg viewBox="0 0 24 24" ' + S + '><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
    phone: '<svg viewBox="0 0 24 24" ' + S + '><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" ' + S + '><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
    pin: '<svg viewBox="0 0 24 24" ' + S + '><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    clock: '<svg viewBox="0 0 24 24" ' + S + '><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" ' + S + '><path d="m6 9 6 6 6-6"/></svg>',
    arrowUp: '<svg viewBox="0 0 24 24" ' + S + '><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
    arrowDown: '<svg viewBox="0 0 24 24" ' + S + '><path d="M12 5v14M19 12l-7 7-7-7"/></svg>',
    search: '<svg viewBox="0 0 24 24" ' + S + '><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
    check: '<svg viewBox="0 0 24 24" ' + S + '><path d="M20 6 9 17l-5-5"/></svg>',
    shield: '<svg viewBox="0 0 24 24" ' + S + '><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>',
    download: '<svg viewBox="0 0 24 24" ' + S + '><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" ' + S + '><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>',
  };
  function icon(name) { return ICONS[name] || ICONS.pulse; }

  /* ---------------- ছোট হেল্পার ---------------- */
  function toast(msg, type) {
    const wrap = $("#toastWrap");
    if (!wrap) return;
    const el = document.createElement("div");
    el.className = "toast " + (type === "error" ? "toast-error" : type === "info" ? "toast-info" : "toast-success");
    el.innerHTML = (type === "error" ? '<span class="toast-dot err"></span>' : '<span class="toast-dot ok"></span>') + "<span>" + msg + "</span>";
    wrap.appendChild(el);
    requestAnimationFrame(() => el.classList.add("show"));
    setTimeout(() => { el.classList.remove("show"); setTimeout(() => el.remove(), 400); }, 4200);
  }

  function stars(n) {
    let out = "";
    for (let i = 0; i < 5; i++) out += '<span class="star' + (i < n ? " on" : "") + '">' + icon("star") + "</span>";
    return out;
  }

  function esc(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  /* ---------------- গ্লোবাল স্টেট ---------------- */
  const state = {
    tests: [], testSource: "default",
    cat: "all", query: "",
    countersDone: false,
  };

  /* ================= রেন্ডার ফাংশনসমূহ ================= */

  function renderTicker(notices) {
    const track = $("#tickerTrack");
    if (!track || !notices.length) return;
    const items = notices.map((n) => '<span class="ticker-item">' + icon("pulse") + esc(Lang.pick(n)) + "</span>").join('<span class="ticker-sep">●</span>');
    // seamless loop: একই কনটেন্ট দুইবার
    track.innerHTML = '<div class="ticker-half">' + items + '</div><div class="ticker-half" aria-hidden="true">' + items + "</div>";
  }

  function renderStats() {
    const wrap = $("#heroStats");
    if (!wrap) return;
    const list = DEF.stats || [];
    wrap.innerHTML = list.map((s, i) => {
      const finalText = state.countersDone
        ? Lang.digits(Number(s.value).toLocaleString("en-IN")) + (s.suffix || "")
        : "0";
      return '<div class="stat reveal" data-reveal style="--d:' + (0.15 * i) + 's">' +
        '<span class="stat-num" data-count="' + s.value + '" data-suffix="' + (s.suffix || "") + '">' + finalText + "</span>" +
        '<span class="stat-label">' + esc(Lang.pick(s.label)) + "</span></div>";
    }).join("");
  }

  function renderSolutions(list) {
    const wrap = $("#solutionGrid");
    if (!wrap) return;
    wrap.innerHTML = list.map((s, i) =>
      '<article class="sol-card reveal" data-reveal style="--d:' + (0.08 * (i % 3)) + 's">' +
      '<div class="sol-icon">' + icon(s.icon) + "</div>" +
      '<h3 class="sol-title">' + esc(Lang.pick(s.title)) + "</h3>" +
      '<p class="sol-desc">' + esc(Lang.pick(s.desc)) + "</p>" +
      "</article>"
    ).join("");
    observeReveals(wrap);
  }

  function renderServices(list) {
    const wrap = $("#serviceGrid");
    if (!wrap) return;
    wrap.innerHTML = list.map((s, i) =>
      '<article class="svc-card reveal" data-reveal style="--d:' + (0.08 * (i % 4)) + 's">' +
      '<div class="svc-thumb"><img src="' + esc(s.image) + '" alt="' + esc(Lang.pick(s.title)) + '" loading="lazy">' +
      '<span class="svc-ico">' + icon(s.icon) + "</span></div>" +
      '<div class="svc-body"><h3>' + esc(Lang.pick(s.title)) + "</h3>" +
      "<p>" + esc(Lang.pick(s.desc)) + "</p>" +
      '<a href="#appointment" class="svc-link">' + esc(Lang.t("services.more")) + icon("arrowDown") + "</a></div>" +
      "</article>"
    ).join("");
    observeReveals(wrap);
  }

  function testRows() {
    const q = state.query.trim().toLowerCase();
    return state.tests.filter((t) => {
      const okCat = state.cat === "all" || t.cat === state.cat;
      const name = Lang.pick(t.name).toLowerCase();
      const okQ = !q || name.includes(q) || String(t.id).toLowerCase().includes(q);
      return okCat && okQ;
    });
  }

  function renderPrices() {
    const wrap = $("#priceTableWrap");
    if (!wrap) return;
    if (!state.tests.length) {
      wrap.innerHTML = '<div class="price-empty" style="padding:60px 20px"><span class="spinner big"></span><p style="margin-top:16px">' + esc(Lang.t("prices.loading")) + "</p></div>";
      return;
    }
    const rows = testRows();
    const counterEl = $("#priceCount");
    if (counterEl) counterEl.textContent = Lang.digits(rows.length) + " " + Lang.t("prices.found");

    if (!rows.length) {
      wrap.innerHTML = '<div class="price-empty">' + icon("search") + "<p>" + esc(Lang.t("prices.none")) + "</p></div>";
      return;
    }
    wrap.innerHTML =
      '<table class="price-table"><thead><tr>' +
      "<th>" + esc(Lang.t("prices.test")) + "</th>" +
      "<th>" + esc(Lang.t("prices.cat")) + "</th>" +
      "<th>" + esc(Lang.t("prices.fee")) + "</th>" +
      "<th>" + esc(Lang.t("prices.prep")) + "</th>" +
      "<th></th></tr></thead><tbody>" +
      rows.map((t) => {
        const cat = (DEF.testCategories && DEF.testCategories[t.cat]) || { bn: t.cat, en: t.cat };
        return "<tr>" +
          '<td class="pt-name">' + esc(Lang.pick(t.name)) + "</td>" +
          '<td><span class="cat-chip cat-' + esc(t.cat) + '">' + esc(Lang.pick(cat)) + "</span></td>" +
          '<td class="pt-price">' + Lang.price(t.price) + "</td>" +
          '<td class="pt-prep">' + esc(Lang.pick(t.prep)) + " · " + esc(Lang.pick(t.days)) + "</td>" +
          '<td><button class="btn-book-test" data-test="' + esc(Lang.pick(t.name)) + '">' + esc(Lang.t("prices.book")) + "</button></td>" +
          "</tr>";
      }).join("") +
      "</tbody></table>";

    $$(".btn-book-test", wrap).forEach((btn) => btn.addEventListener("click", () => {
      prefillAppointment("test", btn.dataset.test);
    }));
  }

  function renderCategoryChips() {
    const wrap = $("#priceFilters");
    if (!wrap) return;
    const cats = Object.entries(DEF.testCategories || {});
    const all = '<button class="chip active" data-cat="all">' + esc(Lang.t("prices.all")) + "</button>";
    wrap.innerHTML = all + cats.map(([key, label]) =>
      '<button class="chip" data-cat="' + key + '">' + esc(Lang.pick(label)) + "</button>"
    ).join("");
    $$(".chip", wrap).forEach((chip) => chip.addEventListener("click", () => {
      $$(".chip", wrap).forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      state.cat = chip.dataset.cat;
      renderPrices();
    }));
  }

  function renderPackages(list) {
    const wrap = $("#packageGrid");
    if (!wrap) return;
    wrap.innerHTML = list.map((p, i) => {
      const save = p.oldPrice ? p.oldPrice - p.price : 0;
      return '<article class="pkg-card reveal' + (p.popular ? " popular" : "") + '" data-reveal style="--d:' + (0.1 * i) + 's">' +
        (p.popular ? '<span class="pkg-flag">' + esc(Lang.t("packages.popular")) + "</span>" : "") +
        '<h3 class="pkg-name">' + esc(Lang.pick(p.name)) + "</h3>" +
        '<div class="pkg-price"><span class="pkg-amount">' + Lang.price(p.price) + "</span>" +
        (p.oldPrice ? '<span class="pkg-old">' + Lang.price(p.oldPrice) + "</span>" : "") + "</div>" +
        (save ? '<span class="pkg-save">' + Lang.t("packages.save") + " " + Lang.price(save) + "</span>" : "") +
        '<ul class="pkg-items">' + (p.items || []).map((it) =>
          "<li>" + icon("check") + "<span>" + esc(Lang.pick(it)) + "</span></li>").join("") + "</ul>" +
        '<button class="btn btn-outline pkg-book" data-pkg="' + esc(Lang.pick(p.name)) + '">' + esc(Lang.t("packages.book")) + "</button>" +
        "</article>";
    }).join("");
    observeReveals(wrap);
    $$(".pkg-book", wrap).forEach((btn) => btn.addEventListener("click", () => {
      prefillAppointment("pkg", btn.dataset.pkg);
    }));
  }

  function renderDoctors(list) {
    const wrap = $("#doctorGrid");
    if (!wrap) return;
    wrap.innerHTML = list.map((d, i) =>
      '<article class="doc-card reveal" data-reveal style="--d:' + (0.09 * i) + 's">' +
      '<div class="doc-photo"><img src="' + esc(d.img) + '" alt="' + esc(Lang.pick(d.name)) + '" loading="lazy">' +
      '<span class="doc-badge">' + icon("shield") + "</span></div>" +
      '<div class="doc-body">' +
      '<h3 class="doc-name">' + esc(Lang.pick(d.name)) + "</h3>" +
      '<p class="doc-spec">' + esc(Lang.pick(d.spec)) + "</p>" +
      '<p class="doc-degree">' + esc(Lang.pick(d.degree)) + "</p>" +
      '<div class="doc-meta">' + icon("clock") + "<span>" + esc(Lang.pick(d.days)) + " · " + esc(Lang.pick(d.time)) + "</span></div>" +
      '<div class="doc-meta">' + icon("pin") + "<span>" + esc(Lang.pick(d.room)) + "</span></div>" +
      '<button class="btn btn-green doc-book" data-doc="' + esc(Lang.pick(d.name)) + '">' + esc(Lang.t("doctors.book")) + "</button>" +
      "</div></article>"
    ).join("");
    observeReveals(wrap);
    $$(".doc-book", wrap).forEach((btn) => btn.addEventListener("click", () => {
      prefillAppointment("doc", btn.dataset.doc);
    }));
  }

  function renderTestimonials(list) {
    const wrap = $("#testiTrack");
    const dots = $("#testiDots");
    if (!wrap || !list.length) return;
    wrap.innerHTML = list.map((t) =>
      '<figure class="testi-slide">' +
      '<div class="testi-stars">' + stars(t.rating || 5) + "</div>" +
      '<blockquote>"' + esc(Lang.pick(t.text)) + '"</blockquote>' +
      '<figcaption><span class="testi-avatar">' + esc(Lang.pick(t.name).trim().charAt(0)) + "</span>" +
      "<div><strong>" + esc(Lang.pick(t.name)) + "</strong><small>" + esc(Lang.pick(t.area)) + "</small></div></figcaption>" +
      "</figure>"
    ).join("");
    if (dots) {
      dots.innerHTML = list.map((_, i) => '<button class="testi-dot' + (i === 0 ? " active" : "") + '" data-i="' + i + '" aria-label="slide ' + (i + 1) + '"></button>').join("");
      $$(".testi-dot", dots).forEach((dot) => dot.addEventListener("click", () => goSlide(+dot.dataset.i)));
    }
    goToSlide(0);
    startTestiAuto(list.length);
  }

  let testiIndex = 0, testiTimer = null;
  function goToSlide(i) {
    const track = $("#testiTrack");
    const dots = $$(".testi-dot");
    if (!track || !track.children.length) return;
    testiIndex = (i + track.children.length) % track.children.length;
    track.style.transform = "translateX(-" + testiIndex * 100 + "%)";
    dots.forEach((d, di) => d.classList.toggle("active", di === testiIndex));
  }
  function goSlide(i) { goToSlide(i); restartTestiAuto(); }
  function startTestiAuto(n) {
    stopTestiAuto();
    if (n <= 1) return;
    testiTimer = setInterval(() => goToSlide(testiIndex + 1), (CFG.runtime && CFG.runtime.testimonialDelay) || 6000);
  }
  function stopTestiAuto() { if (testiTimer) { clearInterval(testiTimer); testiTimer = null; } }
  function restartTestiAuto() {
    if (testiTimer) startTestiAuto($("#testiTrack").children.length);
  }

  function renderFaqs(list) {
    const wrap = $("#faqList");
    if (!wrap) return;
    wrap.innerHTML = list.map((f, i) =>
      '<div class="faq-item reveal" data-reveal style="--d:' + (0.06 * i) + 's">' +
      '<button class="faq-q" aria-expanded="false"><span>' + esc(Lang.pick(f.q)) + "</span>" +
      '<span class="faq-chev">' + icon("chevron") + "</span></button>" +
      '<div class="faq-a"><p>' + esc(Lang.pick(f.a)) + "</p></div>" +
      "</div>"
    ).join("");
    observeReveals(wrap);
    $$(".faq-q", wrap).forEach((btn) => btn.addEventListener("click", () => {
      const item = btn.parentElement;
      const open = item.classList.contains("open");
      $$(".faq-item.open", wrap).forEach((o) => { o.classList.remove("open"); $(".faq-q", o).setAttribute("aria-expanded", "false"); $(".faq-a", o).style.maxHeight = null; });
      if (!open) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
        const a = $(".faq-a", item);
        a.style.maxHeight = a.scrollHeight + "px";
      }
    }));
  }

  function renderHours(list) {
    $$(".hours-list").forEach((wrap) => {
      wrap.innerHTML = list.map((h) =>
        '<div class="hour-row"><span>' + icon("clock") + esc(Lang.pick(h.day)) + "</span><strong>" + esc(Lang.pick(h.time)) + "</strong></div>"
      ).join("");
    });
  }

  function renderDepartments(list) {
    const sel = $("#apptDept");
    if (!sel) return;
    const ph = '<option value="" disabled selected>' + esc(Lang.t("appt.deptph")) + "</option>";
    sel.innerHTML = ph + list.map((d) => '<option value="' + esc(Lang.pick(d)) + '">' + esc(Lang.pick(d)) + "</option>").join("");
  }

  function renderDoctorOptions(list) {
    const sel = $("#apptDoctor");
    if (!sel) return;
    const ph = '<option value="">' + esc(Lang.t("appt.anydoctor")) + "</option>";
    sel.innerHTML = ph + list.map((d) => '<option value="' + esc(Lang.pick(d.name)) + '">' + esc(Lang.pick(d.name)) + " — " + esc(Lang.pick(d.spec)) + "</option>").join("");
  }

  /* ---------------- সব ডাটা লোড ও রেন্ডার ---------------- */
  async function renderAll() {
    renderTicker(DEF.notices || []);
    renderSolutions(DEF.solutions || []);
    renderServices(DEF.services || []);
    renderPackages(DEF.packages || []);
    renderDoctors(DEF.doctors || []);
    renderTestimonials(DEF.testimonials || []);
    renderFaqs(DEF.faqs || []);
    renderHours(DEF.hours || []);
    renderDepartments(DEF.departments || []);
    renderDoctorOptions(DEF.doctors || []);
    renderCategoryChips();
    renderPrices();
    renderStats();
    observeReveals(document);
  }

  async function fetchDataAndRender() {
    try {
      const res = await DataAPI.getCollection("tests");
      state.tests = res.data || [];
      state.testSource = res.source;
      const badge = $("#priceSourceBadge");
      if (badge) {
        badge.textContent = (res.source === "default" ? "Demo" : res.source === "firebase" ? "Firebase" : "Google Sheets");
        badge.classList.add("show");
      }
    } catch (e) {
      state.tests = DEF.tests || [];
    }
    renderPrices();
  }

  /* ================= ইন্টার‍্যাকশন ================= */

  /* ---- প্রি-লোডার ---- */
  function initPreloader() {
    const pre = $("#preloader");
    if (!pre) return;
    const hide = () => pre.classList.add("done");
    window.addEventListener("load", hide);
    setTimeout(hide, 2200); // সর্বোচ্চ ২.২ সেকেন্ড
  }

  /* ---- স্টিকি নেভ + স্ক্রল প্রোগ্রেস + স্ক্রল-টপ ---- */
  function initScrollEffects() {
    const nav = $("#navbar");
    const topBtn = $("#scrollTop");
    const progress = $("#scrollProgress");
    const hero = $("#home");

    function onScroll() {
      const y = window.scrollY || document.documentElement.scrollTop;

      // স্টিকি নেভে ছায়া
      if (nav) nav.classList.toggle("scrolled", y > 10);

      // স্ক্রল প্রোগ্রেস বার
      if (progress) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
      }

      // Hero পার হলে স্ক্রল-টপ বাটন
      if (topBtn && hero) {
        const heroH = hero.offsetHeight || 1;
        const show = y > heroH * ((CFG.runtime && CFG.runtime.scrollTopOffset) || 0.9);
        topBtn.classList.toggle("show", show);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (topBtn) topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* ---- স্ক্রল-স্পাই ---- */
  function initScrollSpy() {
    const links = $$('.nav-links a[href^="#"]');
    const map = {};
    links.forEach((l) => { const id = l.getAttribute("href").slice(1); map[id] = l; });
    const sections = Object.keys(map).map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          links.forEach((l) => l.classList.remove("active"));
          const link = map[en.target.id];
          if (link) link.classList.add("active");
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach((s) => io.observe(s));
  }

  /* ---- মোবাইল মেনু ---- */
  function initMobileMenu() {
    const burger = $("#navBurger");
    const drawer = $("#mobileDrawer");
    const overlay = $("#drawerOverlay");
    const close = $("#drawerClose");
    function openMenu() {
      drawer.classList.add("open"); overlay.classList.add("show");
      burger.classList.add("active");
      burger.setAttribute("aria-expanded", "true");
      /* html এলিমেন্টে লক করা হচ্ছে — body-তে overflow:hidden দিলে
         overflow-x: clip স্ট্র্যাটেজিতে ভিউপোর্ট স্ক্রল বন্ধ হয় না */
      document.documentElement.style.overflow = "hidden";
    }
    function closeMenu() {
      drawer.classList.remove("open"); overlay.classList.remove("show");
      burger.classList.remove("active");
      burger.setAttribute("aria-expanded", "false");
      document.documentElement.style.overflow = "";
    }
    if (burger) burger.addEventListener("click", () => drawer.classList.contains("open") ? closeMenu() : openMenu());
    if (close) close.addEventListener("click", closeMenu);
    if (overlay) overlay.addEventListener("click", closeMenu);
    $$("a", drawer).forEach((a) => a.addEventListener("click", closeMenu));
    $$(".drawer-lang-btn", drawer).forEach((b) => b.addEventListener("click", closeMenu));
  }

  /* ---- reveal অ্যানিমেশন ---- */
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("revealed");
        revealIO.unobserve(en.target);
      }
    });
  }, { threshold: 0.14 });

  function observeReveals(scope) {
    $$("[data-reveal]", scope || document).forEach((el) => {
      if (!el.classList.contains("revealed")) revealIO.observe(el);
    });
  }

  /* ---- কাউন্টার অ্যানিমেশন ---- */
  function initCounters() {
    const nums = $$(".stat-num");
    if (!nums.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        io.unobserve(el);
        const target = +el.dataset.count || 0;
        const suffix = el.dataset.suffix || "";
        const dur = 1800;
        const t0 = performance.now();
        function tick(now) {
          const p = Math.min((now - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = Math.round(target * eased);
          el.textContent = Lang.digits(val.toLocaleString("en-IN")) + suffix;
          if (p < 1) requestAnimationFrame(tick);
          else state.countersDone = true;
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });
    nums.forEach((n) => io.observe(n));
  }

  /* ---- ভাষা টগল ---- */
  function initLang() {
    Lang.detect();
    $$("[data-lang-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => Lang.toggle());
    });
    document.addEventListener("lang:changed", () => {
      syncLangButtons();
      initConfigLinks();
      renderAll();
      updateFloatingLabels();
    });
    syncLangButtons();
  }

  function syncLangButtons() {
    const cur = Lang.current;
    $$("[data-lang-toggle]").forEach((btn) => {
      $$("span", btn).forEach((sp) => sp.classList.toggle("active", sp.dataset.lang === cur));
    });
  }

  /* ---- ফ্লোটিং বাটন ও কনফিগ লিংক ---- */
  function updateFloatingLabels() {
    const call = $("#floatCall");
    const wa = $("#floatWa");
    if (call) call.setAttribute("aria-label", Lang.t("misc.callUs"));
    if (wa) wa.setAttribute("aria-label", Lang.t("misc.whatsapp"));
    const scrollTop = $("#scrollTop");
    if (scrollTop) scrollTop.setAttribute("aria-label", Lang.t("misc.scrollTop"));
  }

  function initConfigLinks() {
    const c = CFG.contact, m = CFG.map;
    $$("[data-tel]").forEach((el) => { el.setAttribute("href", "tel:+88" + String(el.dataset.tel || c.hotline).replace(/-/g, "")); });
    $$("[data-tel-text]").forEach((el) => { el.textContent = el.dataset.telText || c.hotline; });
    $$("[data-emergency-text]").forEach((el) => { el.textContent = c.emergency; });
    $$("[data-email]").forEach((el) => { el.setAttribute("href", "mailto:" + c.email); el.textContent = c.email; });
    $$(".wa-link").forEach((el) => {
      const msg = Lang.current === "bn" ? "আসসালামু আলাইকুম, আমি একটি পরীক্ষা/অ্যাপয়েন্টমেন্ট সম্পর্কে জানতে চাই।" : "Hello, I want to know about a test/appointment.";
      el.setAttribute("href", "https://wa.me/" + c.whatsapp + "?text=" + encodeURIComponent(msg));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });
    $$("[data-map-dir]").forEach((el) => {
      el.setAttribute("href", "https://www.google.com/maps/dir/?api=1&destination=" + (m.directionsQuery || m.embedQuery));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });
    const frame = $("#mapFrame");
    if (frame) {
      frame.setAttribute("src", "https://maps.google.com/maps?q=" + m.embedQuery + "&z=" + m.zoom + "&hl=" + m.language + "&output=embed");
      frame.setAttribute("loading", "lazy");
      frame.setAttribute("title", "Google Map - Padma Care, Rajshahi");
    }
    // ঠিকানা লাইন
    $$("[data-address-lines]").forEach((el) => {
      const lines = Lang.current === "bn" ? CFG.address.linesBn : CFG.address.linesEn;
      el.innerHTML = lines.map((l) => "<span>" + esc(l) + "</span>").join("");
    });
    // এরিয়া হিন্ট
    $$("[data-area-hint]").forEach((el) => {
      el.textContent = Lang.current === "bn" ? CFG.address.areaHintBn : CFG.address.areaHintEn;
    });
    // সোশ্যাল
    $$("[data-social]").forEach((el) => { el.setAttribute("href", CFG.social[el.dataset.social] || "#"); el.setAttribute("target", "_blank"); el.setAttribute("rel", "noopener"); });
    updateFloatingLabels();
  }

  /* ---- অ্যাপয়েন্টমেন্ট প্রি-ফিল ---- */
  function prefillAppointment(type, label) {
    const form = $("#appointmentForm");
    const dept = $("#apptDept");
    const doctor = $("#apptDoctor");
    const msg = $("#apptMsg");
    if (!form) return;
    if (dept && (type === "pkg" || type === "test")) {
      const list = DEF.departments || [];
      const found = list.find((d) => Lang.pick(d).includes("টেস্ট") || Lang.pick(d).toLowerCase().includes("test"));
      if (found) dept.value = Lang.pick(found);
    }
    if (doctor && type === "doc") doctor.value = label;
    if (msg) {
      const prefix = Lang.current === "bn" ? "সংযুক্ত: " : "Regarding: ";
      msg.value = prefix + label;
    }
    form.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => $("#apptName") && $("#apptName").focus({ preventScroll: true }), 650);
    toast(type === "doc" ? (Lang.current === "bn" ? label + " এর জন্য ফর্ম প্রস্তুত" : "Form prepared for " + label) : (Lang.current === "bn" ? "ফর্মে সংযুক্ত করা হয়েছে" : "Added to the form"), "info");
  }

  /* ---- রিপোর্ট চেক ---- */
  function initReportCheck() {
    const input = $("#reportInput");
    const btn = $("#reportBtn");
    const result = $("#reportResult");
    if (!input || !btn || !result) return;

    const modeNote = $("#reportModeNote");
    if (modeNote && !DataAPI.hasRemote) modeNote.textContent = Lang.t("report.demo") + " — " + Lang.t("report.demoMode");

    async function doCheck() {
      const id = input.value.trim();
      if (!id) { input.focus(); return; }
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner"></span>' + esc(Lang.t("report.checking"));
      result.className = "report-result checking";
      result.innerHTML = '<div class="report-loading"><span class="spinner big"></span></div>';
      const rep = await DataAPI.checkReport(id);
      btn.disabled = false;
      btn.innerHTML = esc(Lang.t("report.btn"));
      if (!rep) {
        result.className = "report-result notfound";
        result.innerHTML = '<div class="report-card rr-miss">' + icon("search") + "<p>" + esc(Lang.t("report.notfound")) + "</p></div>";
        return;
      }
      const ready = rep.status === "ready";
      result.className = "report-result found";
      result.innerHTML =
        '<div class="report-card">' +
        '<div class="rr-head"><span class="rr-status ' + (ready ? "ready" : "proc") + '">' + (ready ? icon("check") + esc(Lang.t("report.ready")) : icon("clock") + esc(Lang.t("report.processing"))) + "</span>" +
        '<span class="rr-id">' + esc(rep.id) + "</span></div>" +
        '<div class="rr-row"><span>' + esc(Lang.t("report.patient")) + "</span><strong>" + esc(Lang.pick(rep.patient) || "—") + "</strong></div>" +
        '<div class="rr-row"><span>' + esc(Lang.t("report.tests")) + "</span><strong>" + esc(Lang.pick(rep.tests) || "—") + "</strong></div>" +
        '<div class="rr-row"><span>' + esc(Lang.t("report.date")) + "</span><strong>" + esc(Lang.digits(rep.date) || "—") + "</strong></div>" +
        (ready ? '<button class="btn btn-green rr-download">' + icon("download") + esc(Lang.t("report.download")) + "</button>" : "") +
        "</div>";
      const dl = $(".rr-download", result);
      if (dl) dl.addEventListener("click", () => downloadDemoReport(rep));
    }
    btn.addEventListener("click", doCheck);
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") doCheck(); });
  }

  function downloadDemoReport(rep) {
    const L = Lang;
    const lines = [
      (L.current === "bn" ? "পদ্মা কেয়ার ক্লিনিক ও ডায়াগনস্টিক সেন্টার, রাজশাহী" : "Padma Care Clinic & Diagnostic Center, Rajshahi"),
      (L.current === "bn" ? "শেরশাহ রোড, লক্ষীপুর মোড়, রাজশাহী-৬০০০" : "Shershah Road, Laxmipur More, Rajshahi-6000"),
      "----------------------------------------------",
      (L.current === "bn" ? "রিপোর্ট নম্বর : " : "Report ID  : ") + rep.id,
      (L.current === "bn" ? "রোগীর নাম   : " : "Patient     : ") + L.pick(rep.patient),
      (L.current === "bn" ? "পরীক্ষা       : " : "Tests       : ") + L.pick(rep.tests),
      (L.current === "bn" ? "তারিখ         : " : "Date        : ") + rep.date,
      (L.current === "bn" ? "স্ট্যাটাস      : " : "Status      : ") + (rep.status === "ready" ? L.t("report.ready") : L.t("report.processing")),
      "----------------------------------------------",
      (L.current === "bn" ? "ডেমো রিপোর্ট — আসল রিপোর্ট PDF এর জন্য Firebase সেটআপ করুন।" : "Demo report — connect Firebase for real PDF reports."),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = rep.id + ".txt";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  /* ---- অ্যাপয়েন্টমেন্ট ফর্ম ---- */
  function initAppointmentForm() {
    const form = $("#appointmentForm");
    if (!form) return;
    const dateInput = $("#apptDate");
    if (dateInput) {
      const today = new Date();
      dateInput.min = today.toISOString().slice(0, 10);
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = $("#apptName");
      const phone = $("#apptPhone");
      const dept = $("#apptDept");
      let ok = true;
      ok = fieldError(name, name.value.trim().length >= 3, "appt.errName") && ok;
      ok = fieldError(phone, /^01[3-9]\d{8}$/.test(phone.value.replace(/[\s-]/g, "")), "appt.errPhone") && ok;
      ok = fieldError(dept, !!dept.value, "appt.errDept") && ok;
      if (!ok) return;

      const btn = $("#apptSubmit");
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner"></span>' + esc(Lang.t("appt.submitting"));

      const payload = {
        name: name.value.trim(),
        phone: phone.value.trim(),
        age: $("#apptAge") ? $("#apptAge").value : "",
        gender: $("#apptGender") ? $("#apptGender").value : "",
        department: dept.value,
        doctor: $("#apptDoctor") ? $("#apptDoctor").value : "",
        date: dateInput ? dateInput.value : "",
        slot: $("#apptSlot") ? $("#apptSlot").value : "",
        message: $("#apptMsg") ? $("#apptMsg").value.trim() : "",
        lang: Lang.current,
        sourcePage: "padma-care-rajshahi",
      };

      const res = await DataAPI.submitForm("appointment", payload);
      btn.disabled = false;
      btn.innerHTML = esc(Lang.t("appt.submit"));

      const success = $("#apptSuccess");
      form.hidden = true;
      success.hidden = false;
      $("#apptTrackingId").textContent = res.id;
      const note = $("#apptStorageNote");
      if (note) {
        if (res.offline) { note.textContent = Lang.t("appt.offline"); note.hidden = false; }
        else { note.textContent = "✓ " + DataAPI.modeLabel(); note.hidden = false; }
      }
      success.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    const resetBtn = $("#apptReset");
    if (resetBtn) resetBtn.addEventListener("click", () => {
      form.reset();
      form.hidden = false;
      $("#apptSuccess").hidden = true;
      $$(".field.invalid", form).forEach((f) => f.classList.remove("invalid"));
    });
  }

  function fieldError(input, valid, errKey) {
    const field = input.closest(".field");
    if (!field) return valid;
    field.classList.toggle("invalid", !valid);
    const errEl = $(".field-err", field);
    if (errEl) errEl.textContent = valid ? "" : Lang.t(errKey);
    return valid;
  }

  /* ---- স্মুথ স্ক্রল (অ্যাংকর লিংক) ---- */
  function initSmoothAnchors() {
    $$('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (id === "#" || id.length < 2) return;
        const target = document.getElementById(id.slice(1));
        if (!target) return;
        e.preventDefault();
        const navH = $("#navbar") ? $("#navbar").offsetHeight : 70;
        const y = target.getBoundingClientRect().top + window.scrollY - navH - 8;
        window.scrollTo({ top: y, behavior: "smooth" });
      });
    });
  }

  /* ================= ইনিশিয়ালাইজ ================= */
  function init() {
    initPreloader();
    initLang();
    Lang.applyStatic();
    initConfigLinks();
    renderAll();
    fetchDataAndRender();
    initScrollEffects();
    initScrollSpy();
    initMobileMenu();
    initSmoothAnchors();
    initCounters();
    initReportCheck();
    initAppointmentForm();

    const yearEl = $("#yearNow");
    if (yearEl) yearEl.textContent = Lang.digits(new Date().getFullYear());

    // প্রাইস সার্চ
    const search = $("#priceSearch");
    if (search) search.addEventListener("input", () => {
      state.query = search.value;
      renderPrices();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
