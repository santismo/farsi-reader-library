from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "readers.json"
ASCII_TO_PERSIAN = str.maketrans("0123456789", "۰۱۲۳۴۵۶۷۸۹")


COURSES = [
    ("cosmos", "علوم و فناوری", "کیهان و اخترشناسی", "Cosmos and Astronomy", "Open educational astronomy references and public NASA science material", [
        ("مقیاس‌های کیهان", "Scales of the Universe", "فاصله، زمان و جرم", "distance, time, and mass", "مقایسهٔ مقیاس‌ها نشان می‌دهد که جهان بسیار بزرگ‌تر از تجربهٔ روزانهٔ ماست.", "Comparing scales shows that the universe is far larger than daily experience."),
        ("نور و مشاهده", "Light and Observation", "نور و طیف", "light and spectrum", "نور اطلاعاتی از دما، ترکیب و حرکتِ اجرام دوردست به ما می‌رساند.", "Light carries information about the temperature, composition, and motion of distant objects."),
        ("گرانش و مدار", "Gravity and Orbits", "جرم و گرانش", "mass and gravity", "گرانش مسیر حرکت ماهواره‌ها، ماه‌ها و سیاره‌ها را شکل می‌دهد.", "Gravity shapes the paths of satellites, moons, and planets."),
        ("خورشید", "The Sun", "همجوشی و انرژی", "fusion and energy", "در هستهٔ خورشید، همجوشی هسته‌ای انرژی فراوانی آزاد می‌کند.", "Nuclear fusion releases enormous energy in the Sun's core."),
        ("سیاره‌های سنگی", "Rocky Planets", "سنگ، فلز و جو", "rock, metal, and atmosphere", "شرایط سطح هر سیاره از ترکیب، فاصله از خورشید و جو آن اثر می‌پذیرد.", "Each planet's surface conditions depend on composition, distance from the Sun, and atmosphere."),
        ("ماه و گرفتگی", "The Moon and Eclipses", "فازها و سایه", "phases and shadow", "فازهای ماه از زاویهٔ میان خورشید، زمین و ماه پدید می‌آیند.", "Moon phases arise from the angle among the Sun, Earth, and Moon."),
        ("سیاره‌های فراخورشیدی", "Exoplanets", "گذار و سرعت شعاعی", "transit and radial velocity", "دانشمندان با کاهش بسیار اندکِ نور ستاره یا حرکت آن، سیاره‌های دور را پیدا می‌کنند.", "Scientists find distant planets through tiny dips in starlight or stellar motion."),
        ("ستاره‌ها", "Stars", "دما، جرم و تابندگی", "temperature, mass, and luminosity", "جرم نخستینِ ستاره تا حد زیادی عمر و سرنوشت آن را تعیین می‌کند.", "A star's initial mass largely determines its lifetime and fate."),
        ("تولد ستاره", "Star Formation", "ابر مولکولی و گرانش", "molecular cloud and gravity", "بخش‌هایی از ابرهای گازی زیر اثر گرانش فشرده می‌شوند و ستاره می‌سازند.", "Parts of gas clouds collapse under gravity to form stars."),
        ("مرگ ستاره", "Stellar Death", "کوتولهٔ سفید و ابرنواختر", "white dwarf and supernova", "برخی ستاره‌ها آرام سرد می‌شوند و برخی با انفجاری عظیم پایان می‌یابند.", "Some stars cool quietly while others end in enormous explosions."),
        ("سیاه‌چاله‌ها", "Black Holes", "افق رویداد و گرانش", "event horizon and gravity", "سیاه‌چاله ناحیه‌ای است که گرانش آن از گریز نور جلوگیری می‌کند.", "A black hole is a region whose gravity prevents light from escaping."),
        ("کهکشان‌ها", "Galaxies", "ستاره، گاز و مادهٔ تاریک", "stars, gas, and dark matter", "کهکشان‌ها سامانه‌هایی بزرگ از ستاره‌ها، گازها و مادهٔ نامرئی‌اند.", "Galaxies are vast systems of stars, gas, and unseen matter."),
        ("راه شیری", "The Milky Way", "بازوهای مارپیچی و مرکز کهکشان", "spiral arms and galactic center", "ما از درون راه شیری، ساختار آن را با اندازه‌گیریِ ستاره‌ها و گازها بازسازی می‌کنیم.", "From inside the Milky Way, we reconstruct its structure by measuring stars and gas."),
        ("انبساط کیهان", "Cosmic Expansion", "انتقال به سرخ و فاصله", "redshift and distance", "نورِ کهکشان‌های دور معمولاً کشیده‌تر می‌شود؛ نشانه‌ای از گسترش فضا.", "Light from distant galaxies is usually stretched, indicating expanding space."),
        ("تلسکوپ‌ها", "Telescopes", "آینه، آشکارساز و وضوح", "mirror, detector, and resolution", "تلسکوپ خوب فقط نور بیشتری جمع نمی‌کند؛ جزئیات دقیق‌تری نیز جدا می‌سازد.", "A good telescope not only gathers more light; it also separates finer detail."),
        ("طیف الکترومغناطیسی", "Electromagnetic Spectrum", "امواج رادیویی تا پرتو گاما", "radio waves through gamma rays", "هر بخشِ طیف، جنبه‌ای دیگر از فرایندهای کیهانی را آشکار می‌کند.", "Each part of the spectrum reveals a different aspect of cosmic processes."),
        ("موشک و پرتاب", "Rockets and Launch", "نیرو، جرم پیشران و سرعت", "force, propellant mass, and velocity", "موشک با پرتابِ جرم به یک سو، خود را در جهت مخالف پیش می‌برد.", "A rocket moves forward by expelling mass in the opposite direction."),
        ("ایستگاه فضایی", "Space Stations", "مدار پایین زمین و پشتیبانیِ زیستی", "low Earth orbit and life support", "زندگی در مدار به بازیافت هوا و آب، برنامه‌ریزی دقیق و همکاری گروهی نیاز دارد.", "Life in orbit requires recycling air and water, precise planning, and teamwork."),
        ("آب‌وهوای فضایی", "Space Weather", "باد خورشیدی و میدان مغناطیسی", "solar wind and magnetic field", "فعالیت خورشید می‌تواند بر ماهواره‌ها، ارتباطات و شبکه‌های برق اثر بگذارد.", "Solar activity can affect satellites, communications, and power grids."),
        ("مریخ", "Mars", "سنگ‌های رسوبی و آبِ گذشته", "sedimentary rocks and ancient water", "نشانه‌های سنگیِ مریخ به پژوهشگران کمک می‌کند گذشتهٔ آبیِ آن را بررسی کنند.", "Martian rock evidence helps researchers investigate its watery past."),
        ("سیاره‌های بیرونی", "Outer Planets", "جوهای عمیق و قمرها", "deep atmospheres and moons", "مشتری، زحل، اورانوس و نپتون جهان‌هایی با جوهای گسترده و قمرهای گوناگون‌اند.", "Jupiter, Saturn, Uranus, and Neptune are worlds with extensive atmospheres and diverse moons."),
        ("سیارک‌ها و دنباله‌دارها", "Asteroids and Comets", "سنگ، یخ و مدار", "rock, ice, and orbit", "این اجرام کوچک، سرنخ‌هایی از مواد آغازینِ منظومهٔ خورشیدی نگه داشته‌اند.", "These small bodies preserve clues about the Solar System's earliest materials."),
        ("جست‌وجوی حیات", "The Search for Life", "آب مایع، انرژی و شیمی", "liquid water, energy, and chemistry", "برای بررسی امکان حیات، دانشمندان به محیط، انرژی و مولکول‌های لازم نگاه می‌کنند.", "To assess the possibility of life, scientists examine environment, energy, and required molecules."),
        ("داده‌های مأموریت", "Mission Data", "اندازه‌گیری، خطا و بازبینی", "measurement, uncertainty, and review", "دادهٔ علمی بدون سنجشِ خطا و بازبینیِ مستقل، نتیجهٔ نهایی به شمار نمی‌آید.", "Scientific data are not final results without uncertainty analysis and independent review."),
    ]),
    ("life", "علوم و فناوری", "زیست و بدن", "Life Science and the Body", "Open educational biology and microbiology references", [
        ("ویژگی‌های زندگی", "Characteristics of Life", "سلول، انرژی و سازمان", "cells, energy, and organization", "جانداران از سلول‌ها ساخته شده‌اند و برای ادامهٔ زندگی انرژی می‌گیرند و سامان می‌دهند.", "Living things are made of cells and obtain and organize energy to continue living."),
        ("سلول", "The Cell", "غشا، سیتوپلاسم و اندامک", "membrane, cytoplasm, and organelle", "سلول با غشا محیط خود را جدا می‌کند و درون آن فرایندهای بسیار انجام می‌شود.", "A cell separates itself from its surroundings with a membrane while many processes occur inside."),
        ("اسید نوکلئیک", "Nucleic Acids", "دنا و آرانا", "DNA and RNA", "دنا اطلاعات وراثتی را نگه می‌دارد و آرانا در خواندن و به‌کارگیریِ آن نقش دارد.", "DNA stores hereditary information and RNA helps read and use it."),
        ("ژن و پروتئین", "Genes and Proteins", "ژن، رمز و پروتئین", "gene, code, and protein", "دستورهای ژنتیکی به ساخت پروتئین‌هایی راه می‌دهند که کارهای سلول را انجام می‌دهند.", "Genetic instructions lead to proteins that carry out cell functions."),
        ("تقسیم سلولی", "Cell Division", "همانندسازی و کروموزوم", "replication and chromosome", "پیش از تقسیم، مادهٔ ژنتیکی باید به‌درستی همانندسازی و میان سلول‌های تازه پخش شود.", "Before division, genetic material must be copied accurately and distributed to new cells."),
        ("تکامل", "Evolution", "تغییرپذیری و انتخاب", "variation and selection", "تفاوت‌های وراثتی می‌توانند در شرایط گوناگون به بقای متفاوتِ جانداران بینجامند.", "Heritable differences can lead to different survival outcomes in different conditions."),
        ("درخت تبار", "The Tree of Life", "خویشاوندی و ویژگی مشترک", "relatedness and shared traits", "شباهت‌های ژنتیکی و ساختاری، خویشاوندیِ جانداران را روشن‌تر می‌کنند.", "Genetic and structural similarities clarify relationships among living things."),
        ("میکروب‌ها", "Microbes", "باکتری، ویروس و قارچ", "bacteria, viruses, and fungi", "میکروب‌ها گروهی یکسان نیستند و شیوهٔ رشد، ساختار و اثرشان بسیار فرق دارد.", "Microbes are not one uniform group; their growth, structure, and effects vary greatly."),
        ("ایمنی", "Immunity", "سد دفاعی و پاسخ ایمنی", "defense barrier and immune response", "بدن با سدهای بیرونی و پاسخ‌های تخصصی، عوامل بیماری‌زا را شناسایی و مهار می‌کند.", "The body uses external barriers and specialized responses to identify and control pathogens."),
        ("دستگاه عصبی", "The Nervous System", "نورون و پیام", "neuron and signal", "نورون‌ها پیام‌های الکتریکی و شیمیایی را دریافت و منتقل می‌کنند.", "Neurons receive and transmit electrical and chemical signals."),
        ("مغز و یادگیری", "Brain and Learning", "شبکهٔ عصبی و تجربه", "neural network and experience", "یادگیری با تغییر در الگوهای ارتباطیِ شبکه‌های عصبی همراه است.", "Learning accompanies changes in the connection patterns of neural networks."),
        ("حواس", "Senses", "گیرنده و تفسیر", "receptor and interpretation", "اندام‌های حسی انرژیِ محیط را به پیام‌هایی تبدیل می‌کنند که مغز تفسیر می‌کند.", "Sense organs convert environmental energy into messages interpreted by the brain."),
        ("هم‌ایستایی", "Homeostasis", "تنظیم و بازخورد", "regulation and feedback", "بدن با سازوکارهای بازخوردی دما، آب و مواد شیمیایی را در محدوده‌ای مناسب نگه می‌دارد.", "The body uses feedback mechanisms to keep temperature, water, and chemicals within suitable ranges."),
        ("فتوسنتز", "Photosynthesis", "نور، آب و دی‌اکسید کربن", "light, water, and carbon dioxide", "گیاهان و برخی جانداران با نور، مواد ساده را به موادِ پرانرژی تبدیل می‌کنند.", "Plants and some organisms use light to convert simple materials into energy-rich substances."),
        ("تنفس سلولی", "Cellular Respiration", "قند، اکسیژن و انرژی", "sugar, oxygen, and energy", "سلول‌ها انرژیِ ذخیره‌شده در مواد غذایی را به شکلی قابل استفاده آزاد می‌کنند.", "Cells release stored energy from food in a usable form."),
        ("گردش خون", "Circulation", "قلب، رگ و تبادل", "heart, vessel, and exchange", "گردش خون مواد لازم را به بافت‌ها می‌رساند و موادِ زائد را دور می‌کند.", "Circulation delivers needed materials to tissues and removes wastes."),
        ("گوارش", "Digestion", "شکستن و جذب", "breakdown and absorption", "دستگاه گوارش مولکول‌های بزرگ را به موادی کوچک‌تر تبدیل می‌کند تا جذب شوند.", "The digestive system turns large molecules into smaller substances that can be absorbed."),
        ("رشد و تولیدمثل", "Growth and Reproduction", "یاختهٔ جنسی و رشد", "sex cell and development", "تولیدمثل و رشد با تقسیم سلولی، تنظیم ژن‌ها و اثر محیط پیوند دارند.", "Reproduction and development connect to cell division, gene regulation, and environmental effects."),
        ("جمعیت و بوم‌سازگان", "Populations and Ecosystems", "جمعیت، زیستگاه و تعامل", "population, habitat, and interaction", "اندازهٔ جمعیت‌ها به منابع، رقابت، شکار و شرایط زیستگاه وابسته است.", "Population size depends on resources, competition, predation, and habitat conditions."),
        ("چرخه‌های ماده", "Cycles of Matter", "کربن، آب و نیتروژن", "carbon, water, and nitrogen", "مواد در طبیعت میان هوا، آب، خاک و جانداران جابه‌جا می‌شوند.", "Materials move through air, water, soil, and organisms in nature."),
        ("تنوع زیستی", "Biodiversity", "گونه، ژن و زیستگاه", "species, genes, and habitat", "تنوع زیستی به پایداریِ بوم‌سازگان‌ها و توان سازگاریِ آن‌ها کمک می‌کند.", "Biodiversity supports ecosystem stability and adaptive capacity."),
        ("ژنتیک و جامعه", "Genetics and Society", "آزمون ژنتیکی و حریم خصوصی", "genetic testing and privacy", "کاربرد دادهٔ ژنتیکی پرسش‌هایی دربارهٔ رضایت، حریم خصوصی و عدالت ایجاد می‌کند.", "Using genetic data raises questions about consent, privacy, and fairness."),
        ("بهداشت عمومی", "Public Health", "پیشگیری و دادهٔ جمعیتی", "prevention and population data", "بهداشت عمومی از داده و همکاری برای کاهش خطر بیماری در جامعه استفاده می‌کند.", "Public health uses data and cooperation to reduce disease risk in communities."),
        ("روش علمی در زیست", "Scientific Method in Biology", "فرضیه، آزمون و تکرار", "hypothesis, testing, and replication", "یک نتیجهٔ زیستی زمانی نیرومندتر است که با آزمون‌های مستقل و تکرارپذیر پشتیبانی شود.", "A biological conclusion is stronger when supported by independent and repeatable tests."),
    ]),
    ("earth-climate", "علوم و فناوری", "زمین و اقلیم", "Earth and Climate", "Public NASA Earth science and open educational geoscience references", [
        ("سامانهٔ زمین", "Earth as a System", "هوا، آب، سنگ و زندگی", "air, water, rock, and life", "بخش‌های زمین جدا از هم عمل نمی‌کنند و پیوسته بر یکدیگر اثر می‌گذارند.", "Earth's parts do not act separately; they continually affect one another."),
        ("درون زمین", "Earth's Interior", "پوسته، گوشته و هسته", "crust, mantle, and core", "لایه‌های زمین از نظر ترکیب، دما و رفتارِ فیزیکی با هم تفاوت دارند.", "Earth's layers differ in composition, temperature, and physical behavior."),
        ("صفحه‌های زمین‌ساختی", "Plate Tectonics", "صفحه، مرز و حرکت", "plate, boundary, and motion", "حرکت صفحه‌ها در مرزهایشان می‌تواند کوه، آتشفشان و زمین‌لرزه پدید آورد.", "Plate motion at boundaries can produce mountains, volcanoes, and earthquakes."),
        ("زمین‌لرزه", "Earthquakes", "گسل، موج و لرزه‌نگار", "fault, wave, and seismograph", "لرزه‌نگارها موج‌های زمین‌لرزه را ثبت می‌کنند تا محل و ویژگیِ آن بررسی شود.", "Seismographs record earthquake waves so their location and characteristics can be studied."),
        ("آتشفشان", "Volcanoes", "ماگما، گاز و فشار", "magma, gas, and pressure", "رفتار آتشفشان به ترکیب ماگما، مقدار گاز و مسیرهای خروج وابسته است.", "Volcanic behavior depends on magma composition, gas content, and escape paths."),
        ("سنگ‌ها", "Rocks", "آذرین، رسوبی و دگرگونی", "igneous, sedimentary, and metamorphic", "سنگ‌ها می‌توانند در چرخه‌ای بلندمدت از ذوب، فرسایش، رسوب و دگرگونی عبور کنند.", "Rocks can pass through a long-term cycle of melting, erosion, deposition, and metamorphism."),
        ("خاک", "Soil", "کانی، مادهٔ آلی و آب", "mineral, organic matter, and water", "خاک فقط سنگ خردشده نیست؛ سامانه‌ای زنده با آب، هوا و جانداران است.", "Soil is not merely crushed rock; it is a living system with water, air, and organisms."),
        ("آب‌های سطحی", "Surface Water", "رودخانه، دریاچه و حوضه", "river, lake, and basin", "آنچه در بالادست رخ می‌دهد، بر کیفیت و مقدار آب در پایین‌دست اثر می‌گذارد.", "What happens upstream affects water quality and quantity downstream."),
        ("آب‌های زیرزمینی", "Groundwater", "نفوذ، آبخوان و برداشت", "infiltration, aquifer, and withdrawal", "آب زیرزمینی با نفوذ بارش پُر می‌شود و برداشتِ بیش از حد می‌تواند آن را کاهش دهد.", "Groundwater is replenished by infiltrating rainfall, and excessive withdrawal can reduce it."),
        ("اقیانوس‌ها", "Oceans", "شوری، دما و جریان", "salinity, temperature, and current", "جریان‌های اقیانوسی گرما و مواد را جابه‌جا می‌کنند و بر آب‌وهوای مناطق اثر دارند.", "Ocean currents move heat and materials and influence regional weather."),
        ("جو", "The Atmosphere", "فشار، دما و رطوبت", "pressure, temperature, and humidity", "هوا از لایه‌هایی با ویژگی‌های گوناگون ساخته شده و در حال حرکت و تغییر است.", "Air consists of layers with different properties and is constantly moving and changing."),
        ("هوا و آب‌وهوا", "Weather", "ابر، بارش و جبهه", "cloud, precipitation, and front", "تغییرهای کوتاه‌مدتِ دما، باد و رطوبت، آب‌وهوای روزانه را می‌سازند.", "Short-term changes in temperature, wind, and humidity create daily weather."),
        ("اقلیم", "Climate", "میانگین بلندمدت و الگو", "long-term average and pattern", "اقلیم از الگوهای بلندمدتِ هوا ساخته می‌شود، نه از یک روز یا یک طوفان.", "Climate consists of long-term weather patterns, not a single day or storm."),
        ("اثر گلخانه‌ای", "Greenhouse Effect", "تابش و گازهای گلخانه‌ای", "radiation and greenhouse gases", "برخی گازها بخشی از گرمای خروجیِ زمین را نگه می‌دارند و دمای سامانه را دگرگون می‌کنند.", "Some gases retain part of Earth's outgoing heat and alter the system's temperature."),
        ("اندازه‌گیریِ اقلیم", "Measuring Climate", "ایستگاه، ماهواره و روند", "station, satellite, and trend", "برای دیدن روندهای اقلیمی، داده‌های بلندمدت از ابزارها و مکان‌های گوناگون کنار هم گذاشته می‌شوند.", "To see climate trends, long-term data from varied instruments and locations are combined."),
        ("انرژی خورشید", "Solar Energy on Earth", "تابش، بازتاب و جذب", "radiation, reflection, and absorption", "سطح‌های روشن و تیره، انرژی خورشید را به یک اندازه بازتاب یا جذب نمی‌کنند.", "Light and dark surfaces do not reflect or absorb solar energy equally."),
        ("یخ و دریا", "Ice and Sea", "یخچال، سطح دریا و بازتاب", "glacier, sea level, and reflectivity", "یخ‌های زمینی و دریایی در تراز دریا و مقدار بازتابِ نور نقش‌های متفاوتی دارند.", "Land and sea ice play different roles in sea level and light reflection."),
        ("آلودگی هوا", "Air Pollution", "ذره، گاز و سلامت", "particle, gas, and health", "کیفیت هوا به ترکیب آلاینده‌ها، شرایط جو و محلِ زندگیِ مردم پیوند دارد.", "Air quality relates to pollutant mix, atmospheric conditions, and where people live."),
        ("خطرهای طبیعی", "Natural Hazards", "پیش‌بینی، آمادگی و تاب‌آوری", "forecasting, preparedness, and resilience", "کاهش خطر فقط به پیش‌بینی وابسته نیست؛ آمادگی و تصمیم‌های محلی نیز اهمیت دارند.", "Risk reduction depends not only on forecasting but also on preparedness and local decisions."),
        ("نقشه و سامانهٔ اطلاعات جغرافیایی", "Maps and Geographic Information", "مکان، مقیاس و لایه", "location, scale, and layer", "نقشه‌های دیجیتال با کنار هم گذاشتنِ لایه‌های مکانی، الگوهای پنهان را آشکار می‌کنند.", "Digital maps reveal hidden patterns by combining spatial layers."),
        ("کشاورزی و زمین", "Agriculture and Land", "آب، خاک و کاربری زمین", "water, soil, and land use", "تصمیم‌های کشاورزی می‌توانند بر خاک، آب و تنوع زیستی اثرهای بلندمدت بگذارند.", "Agricultural decisions can have long-term effects on soil, water, and biodiversity."),
        ("شهرها و گرما", "Cities and Heat", "سطح سخت، سایه و دما", "hard surface, shade, and temperature", "سطح‌های سخت و کمبودِ سایه می‌توانند دمای محله‌ها را از پیرامون بالاتر ببرند.", "Hard surfaces and lack of shade can make neighborhoods warmer than surrounding areas."),
        ("راه‌حل‌های اقلیمی", "Climate Responses", "کاهش، سازگاری و عدالت", "mitigation, adaptation, and equity", "پاسخ به تغییر اقلیم هم کاهشِ انتشار را می‌خواهد و هم سازگاری با پیامدهای موجود را.", "Responding to climate change requires both reducing emissions and adapting to current impacts."),
        ("داده و تصمیم", "Data and Decisions", "شواهد، عدم قطعیت و انتخاب", "evidence, uncertainty, and choice", "دادهٔ علمی به تصمیم کمک می‌کند، اما تصمیم اجتماعی همواره ارزش‌ها و اولویت‌ها را نیز در بر دارد.", "Scientific data inform decisions, but social decisions also include values and priorities."),
    ]),
    ("physical-chemical", "علوم و فناوری", "فیزیک و شیمی", "Physics and Chemistry", "Open educational physics and chemistry references", [
        ("اندازه‌گیری", "Measurement", "یکا، دقت و عدم قطعیت", "unit, precision, and uncertainty", "اندازه‌گیری خوب فقط یک عدد نیست؛ یکا، دقت و محدودیت آن نیز باید روشن باشد.", "A good measurement is not only a number; its unit, precision, and limits must be clear."),
        ("حرکت", "Motion", "مکان، زمان و سرعت", "position, time, and velocity", "برای توصیف حرکت باید روشن کنیم جسم نسبت به چه مرجعی و در چه زمانی جابه‌جا می‌شود.", "To describe motion, we must state relative to what reference and over what time an object moves."),
        ("نیرو", "Force", "برهم‌کنش و شتاب", "interaction and acceleration", "نیرو نتیجهٔ برهم‌کنش است و می‌تواند حرکت یا شکل جسم را تغییر دهد.", "Force is the result of interaction and can change an object's motion or shape."),
        ("انرژی", "Energy", "جنبشی، پتانسیل و انتقال", "kinetic, potential, and transfer", "انرژی میان شکل‌ها و سامانه‌ها جابه‌جا می‌شود، اما در بررسیِ کامل حساب آن نگه داشته می‌شود.", "Energy moves among forms and systems, but is accounted for in a complete analysis."),
        ("تکانه", "Momentum", "جرم و سرعت", "mass and velocity", "تکانه به جرم و سرعت وابسته است و در برخوردها ابزاری مهم برای تحلیل به شمار می‌آید.", "Momentum depends on mass and velocity and is an important tool for analyzing collisions."),
        ("موج", "Waves", "بسامد، طول موج و دامنه", "frequency, wavelength, and amplitude", "ویژگی‌های موج تعیین می‌کنند که انرژی و اطلاعات چگونه در محیط یا خلأ جابه‌جا شود.", "Wave properties determine how energy and information move through a medium or vacuum."),
        ("صوت", "Sound", "ارتعاش و محیط", "vibration and medium", "صوت از ارتعاش پدید می‌آید و برای حرکت معمولاً به محیطِ مادی نیاز دارد.", "Sound arises from vibration and usually needs a material medium to travel."),
        ("الکتریسیته", "Electricity", "بار، جریان و ولتاژ", "charge, current, and voltage", "جریان الکتریکی حرکتِ سازمان‌یافتهٔ بار است و مدار مسیر آن را فراهم می‌کند.", "Electric current is organized motion of charge, and a circuit provides its path."),
        ("مغناطیس", "Magnetism", "میدان و نیرو", "field and force", "میدان مغناطیسی می‌تواند بر بارهای در حال حرکت و برخی مواد نیرو وارد کند.", "A magnetic field can exert force on moving charges and certain materials."),
        ("نور", "Optics", "بازتاب، شکست و عدسی", "reflection, refraction, and lens", "نور هنگام برخورد با سطح یا گذر از مادهٔ دیگر می‌تواند مسیر و شدت خود را تغییر دهد.", "When light meets a surface or enters another material, its path and intensity can change."),
        ("اتم", "The Atom", "هسته و الکترون", "nucleus and electron", "اتم هسته‌ای کوچک و الکترون‌هایی دارد که رفتار شیمیاییِ ماده را شکل می‌دهند.", "An atom has a small nucleus and electrons that shape matter's chemical behavior."),
        ("عنصرها", "Elements", "عدد اتمی و جدول تناوبی", "atomic number and periodic table", "جدول تناوبی عنصرها را بر پایهٔ ساختار اتمی و الگوهای خواص سامان می‌دهد.", "The periodic table organizes elements by atomic structure and patterns of properties."),
        ("پیوند شیمیایی", "Chemical Bonds", "الکترون و پایداری", "electron and stability", "اتم‌ها با به‌اشتراک‌گذاری یا جابه‌جاییِ الکترون‌ها پیوندهایی با ویژگی‌های تازه می‌سازند.", "Atoms form bonds with new properties by sharing or transferring electrons."),
        ("حالت‌های ماده", "States of Matter", "جامد، مایع و گاز", "solid, liquid, and gas", "دما و فشار می‌توانند آرایش و حرکت ذره‌ها را دگرگون کنند.", "Temperature and pressure can change the arrangement and motion of particles."),
        ("واکنش شیمیایی", "Chemical Reactions", "واکنش‌دهنده و فرآورده", "reactant and product", "در واکنش شیمیایی، اتم‌ها از میان نمی‌روند؛ پیوندهایشان بازآرایی می‌شود.", "In a chemical reaction, atoms do not disappear; their bonds rearrange."),
        ("مقدار ماده", "Amount of Substance", "مول و نسبت", "mole and ratio", "نسبت‌های واکنش به ما اجازه می‌دهند مقدارهای مواد را در مقیاسی بسیار کوچک یا بزرگ پیوند دهیم.", "Reaction ratios let us relate amounts of substances at very small or large scales."),
        ("محلول‌ها", "Solutions", "حل‌شونده و حلال", "solute and solvent", "غلظتِ محلول نشان می‌دهد چه مقدار ماده در حجم معینی پخش شده است.", "A solution's concentration shows how much material is dispersed in a given volume."),
        ("اسید و باز", "Acids and Bases", "یون، پی‌اچ و خنثی‌سازی", "ion, pH, and neutralization", "اسیدی یا بازی بودنِ محلول به رفتار یون‌ها در آب وابسته است.", "Whether a solution is acidic or basic depends on ion behavior in water."),
        ("گرما و دما", "Heat and Temperature", "انرژی گرمایی و تعادل", "thermal energy and equilibrium", "گرما انرژیِ منتقل‌شده بر اثر اختلاف دماست، نه نام دیگرِ خودِ دما.", "Heat is energy transferred because of a temperature difference, not another name for temperature itself."),
        ("مواد", "Materials", "ساختار و ویژگی", "structure and property", "سختی، رسانایی و انعطاف‌پذیریِ ماده از ساختار آن در مقیاس کوچک اثر می‌پذیرد.", "Hardness, conductivity, and flexibility depend on a material's small-scale structure."),
        ("هسته", "Nuclear Science", "ایزوتوپ و واپاشی", "isotope and decay", "برخی هسته‌ها ناپایدارند و با واپاشی، ذره یا انرژی آزاد می‌کنند.", "Some nuclei are unstable and release particles or energy through decay."),
        ("پرتو و ایمنی", "Radiation and Safety", "دوز، محافظ و فاصله", "dose, shielding, and distance", "خطرِ پرتو به نوع، مقدار، زمان و شیوهٔ برخورد آن با بدن وابسته است.", "Radiation risk depends on type, amount, time, and how it encounters the body."),
        ("مدل و قانون", "Models and Laws", "توضیح، پیش‌بینی و آزمون", "explanation, prediction, and test", "مدل‌های فیزیک و شیمی زمانی ارزشمندند که پدیده‌ها را توضیح دهند و پیش‌بینی‌های آزمودنی بسازند.", "Physics and chemistry models are valuable when they explain phenomena and make testable predictions."),
        ("فناوریِ ماده", "Materials Technology", "طراحی، آزمایش و کاربرد", "design, test, and application", "انتخاب ماده در فناوری، میانِ کارکرد، هزینه، ایمنی و پیامد زیست‌محیطی تعادل می‌خواهد.", "Selecting a material for technology requires balancing function, cost, safety, and environmental impact."),
    ]),
    ("computing-internet", "علوم و فناوری", "رایانه و اینترنت", "Computing and the Internet", "Adapted original technical study readings based on open standards and public technical documentation", [
        ("اطلاعات و داده", "Information and Data", "داده، الگو و معنا", "data, pattern, and meaning", "داده زمانی به اطلاعات سودمند تبدیل می‌شود که زمینه، ساختار و پرسشِ درست داشته باشد.", "Data become useful information when they have context, structure, and the right question."),
        ("سخت‌افزار", "Computer Hardware", "پردازنده، حافظه و ذخیره‌سازی", "processor, memory, and storage", "هر بخشِ سخت‌افزار کاری متفاوت دارد و سرعت سامانه به هماهنگیِ آن‌ها وابسته است.", "Each hardware part has a different job, and system speed depends on their coordination."),
        ("دستور و برنامه", "Instructions and Programs", "الگوریتم و اجرا", "algorithm and execution", "برنامه مجموعه‌ای از دستورهای دقیق است که رایانه آن‌ها را به ترتیب یا بر پایهٔ شرط اجرا می‌کند.", "A program is a set of precise instructions a computer executes in order or according to conditions."),
        ("الگوریتم", "Algorithms", "گام، ورودی و خروجی", "step, input, and output", "الگوریتم خوب فقط به پاسخ نمی‌رسد؛ باید روشن، قابل آزمون و متناسب با مسئله باشد.", "A good algorithm does not merely reach an answer; it must be clear, testable, and suited to the problem."),
        ("زبان برنامه‌نویسی", "Programming Languages", "نحو، معنا و خطا", "syntax, meaning, and error", "زبان برنامه‌نویسی راهی است برای بیانِ منطق به شکلی که ابزارهای رایانه‌ای بتوانند آن را پردازش کنند.", "A programming language expresses logic in a form computing tools can process."),
        ("داده‌ساختار", "Data Structures", "فهرست، صف و درخت", "list, queue, and tree", "شیوهٔ نگهداریِ داده بر سرعتِ یافتن، تغییر دادن و مرتب کردنِ آن اثر می‌گذارد.", "How data are stored affects the speed of finding, changing, and sorting them."),
        ("سامانهٔ عامل", "Operating Systems", "فرایند، پرونده و دسترسی", "process, file, and permission", "سامانهٔ عامل میانِ برنامه‌ها، سخت‌افزار و کاربر هماهنگی ایجاد می‌کند.", "An operating system coordinates programs, hardware, and the user."),
        ("شبکه", "Networks", "بسته، مسیر و نشانی", "packet, route, and address", "شبکه اطلاعات را به بخش‌هایی کوچک تقسیم می‌کند تا از راه‌های گوناگون جابه‌جا شوند.", "A network divides information into small pieces that can travel by different paths."),
        ("وب", "The Web", "پیوند، درخواست و پاسخ", "link, request, and response", "صفحهٔ وب نتیجهٔ درخواستِ مرورگر و پاسخِ یک خدمت‌دهنده است.", "A web page results from a browser request and a server response."),
        ("پایگاه داده", "Databases", "رکورد، پرس‌وجو و رابطه", "record, query, and relation", "پایگاه داده برای نگهداریِ منظم و بازیابیِ دقیقِ اطلاعات طراحی می‌شود.", "A database is designed to store information systematically and retrieve it precisely."),
        ("رایانش ابری", "Cloud Computing", "خدمت، مقیاس و مرکز داده", "service, scale, and data center", "رایانش ابری منابع پردازشی را به صورت خدمت در دسترس می‌گذارد، اما به شبکه و سیاست‌های داده وابسته است.", "Cloud computing makes processing resources available as services, but depends on networks and data policies."),
        ("رمزنگاری", "Cryptography", "کلید، رمز و اعتبار", "key, cipher, and authenticity", "رمزنگاری برای پنهان کردن یا بررسیِ اصالتِ اطلاعات از روش‌های ریاضی استفاده می‌کند.", "Cryptography uses mathematical methods to hide information or verify authenticity."),
        ("گذرواژه و هویت", "Passwords and Identity", "احراز هویت و دسترسی", "authentication and access", "یک گذرواژهٔ نیرومند تنها بخشی از حفاظت است؛ شیوهٔ ورود و مجوزها نیز اهمیت دارند.", "A strong password is only part of protection; sign-in methods and permissions matter too."),
        ("امنیت شبکه", "Network Security", "تهدید، آسیب‌پذیری و دفاع", "threat, vulnerability, and defense", "امنیت یک محصولِ نهایی نیست؛ فرایندی پیوسته از کاهشِ خطر و واکنش به رخدادهاست.", "Security is not a finished product; it is a continuing process of risk reduction and incident response."),
        ("حریم خصوصی", "Privacy", "دادهٔ شخصی و رضایت", "personal data and consent", "جمع‌آوریِ داده باید هدف روشن، حد مناسب و آگاهیِ کاربر داشته باشد.", "Data collection should have a clear purpose, appropriate limits, and user awareness."),
        ("هوش مصنوعی", "Artificial Intelligence", "داده، مدل و پیش‌بینی", "data, model, and prediction", "سامانهٔ هوش مصنوعی از الگوهای داده برای انجامِ وظیفه یا پیش‌بینی استفاده می‌کند، نه از فهمِ بی‌خطا.", "An AI system uses data patterns to perform a task or prediction, not flawless understanding."),
        ("یادگیری ماشین", "Machine Learning", "آموزش، ارزیابی و تعمیم", "training, evaluation, and generalization", "مدل باید جدا از دادهٔ آموزش آزموده شود تا توان آن در موقعیت تازه روشن گردد.", "A model must be tested apart from training data to reveal how it performs in new situations."),
        ("سوگیریِ الگوریتمی", "Algorithmic Bias", "نمونه، معیار و پیامد", "sample, metric, and consequence", "اگر داده یا معیارِ تصمیم ناعادلانه باشد، سامانه می‌تواند همان نابرابری را بازتولید کند.", "If data or decision criteria are unfair, a system can reproduce the same inequality."),
        ("رابط کاربر", "User Interfaces", "بازخورد، دسترس‌پذیری و آزمون", "feedback, accessibility, and testing", "رابط خوب به کاربر کمک می‌کند بداند چه رخ داده، چه انتخابی دارد و چگونه خطا را اصلاح کند.", "A good interface helps users know what happened, what choices they have, and how to recover from error."),
        ("رسانهٔ دیجیتال", "Digital Media", "فشرده‌سازی و کیفیت", "compression and quality", "فشرده‌سازی حجمِ پرونده را کاهش می‌دهد، اما ممکن است بخشی از کیفیت یا جزئیات را تغییر دهد.", "Compression reduces file size but may alter some quality or detail."),
        ("متن‌باز", "Open Source", "کد، همکاری و مجوز", "code, collaboration, and license", "متن‌باز بودن به معنیِ بی‌قانون بودن نیست؛ شیوهٔ استفاده به مجوز و جامعهٔ پروژه وابسته است.", "Open source does not mean rule-free; use depends on the license and project community."),
        ("آیندهٔ کار", "Technology and Work", "خودکارسازی و مهارت", "automation and skill", "فناوری وظیفه‌ها را دگرگون می‌کند و یادگیریِ پیوسته را برای افراد و سازمان‌ها مهم‌تر می‌سازد.", "Technology changes tasks and makes continuing learning more important for people and organizations."),
        ("شهروندی دیجیتال", "Digital Citizenship", "منبع، مسئولیت و گفت‌وگو", "source, responsibility, and dialogue", "شهروندی دیجیتال یعنی پیش از بازنشر، منبع و پیامدِ اطلاعات را با دقت بسنجیم.", "Digital citizenship means carefully weighing the source and consequences of information before sharing it."),
        ("پروژهٔ فنی", "A Technical Project", "مسئله، نمونه و بازبینی", "problem, prototype, and review", "پروژهٔ فنی با تعریفِ روشنِ مسئله آغاز می‌شود و با آزمون و بازبینی بهبود می‌یابد.", "A technical project begins with a clear problem and improves through testing and review."),
    ]),
    ("engineering-tech", "علوم و فناوری", "مهندسی و فناوری", "Engineering and Technology", "Adapted original engineering readings based on public technical and science materials", [
        ("اندیشیدن مهندسی", "Engineering Thinking", "نیاز، محدودیت و راه‌حل", "need, constraint, and solution", "مهندسی فقط ساختن نیست؛ یافتنِ راه‌حل در میانِ محدودیت‌های واقعی است.", "Engineering is not only building; it is finding solutions amid real constraints."),
        ("فرایند طراحی", "The Design Process", "پرسش، نمونه و بازخورد", "question, prototype, and feedback", "طراحی با تعریف مسئله آغاز می‌شود و با ساخت، آزمون و بازخورد پیش می‌رود.", "Design begins by defining a problem and proceeds through building, testing, and feedback."),
        ("سازه‌ها", "Structures", "بار، تنش و پایداری", "load, stress, and stability", "سازه باید بارها را به مسیرهایی ایمن هدایت کند تا تغییر شکل یا شکست کنترل شود.", "A structure must direct loads along safe paths so deformation or failure is controlled."),
        ("پل‌ها", "Bridges", "کشش، فشار و شکل", "tension, compression, and shape", "شکلِ پل و جایِ مصالح تعیین می‌کند نیروها چگونه میان بخش‌های آن پخش شوند.", "A bridge's shape and material placement determine how forces spread through its parts."),
        ("ماشین‌ها", "Machines", "نیرو، حرکت و بازده", "force, motion, and efficiency", "ماشین‌ها نیرو و حرکت را تبدیل یا منتقل می‌کنند، اما بخشی از انرژی معمولاً تلف می‌شود.", "Machines convert or transmit force and motion, but some energy is usually lost."),
        ("موتور و پیشرانش", "Engines and Propulsion", "سوخت، هوا و رانش", "fuel, air, and thrust", "سامانهٔ پیشرانش برای ایجاد حرکت، انرژی را به نیروی جهت‌دار تبدیل می‌کند.", "A propulsion system converts energy into directed force to create motion."),
        ("هوافضا", "Aerospace", "برآ، پسا و کنترل", "lift, drag, and control", "هواگرد باید میانِ برآ، پسا، وزن و رانش تعادل برقرار کند.", "An aircraft must balance lift, drag, weight, and thrust."),
        ("برق و توان", "Electric Power", "تولید، انتقال و مصرف", "generation, transmission, and consumption", "شبکهٔ برق باید توان را از محل تولید تا مصرف با تلفات و خطرِ کم برساند.", "A power grid must move energy from generation to use with low loss and risk."),
        ("انرژی خورشیدی", "Solar Power", "تابش، پنل و ذخیره", "sunlight, panel, and storage", "پنل خورشیدی نور را به برق تبدیل می‌کند، اما تولید آن با زمان و هوا تغییر می‌کند.", "A solar panel converts sunlight to electricity, but its output changes with time and weather."),
        ("انرژی بادی", "Wind Power", "باد، پره و ژنراتور", "wind, blade, and generator", "توربین بادی بخشی از انرژیِ حرکت هوا را به چرخش و سپس برق تبدیل می‌کند.", "A wind turbine converts part of moving air's energy into rotation and then electricity."),
        ("باتری", "Batteries", "ذخیره، واکنش و چرخه", "storage, reaction, and cycle", "باتری انرژی را با واکنش‌های شیمیایی ذخیره و در زمان نیاز آزاد می‌کند.", "A battery stores energy through chemical reactions and releases it when needed."),
        ("الکترونیک", "Electronics", "مدار، حسگر و کنترل", "circuit, sensor, and control", "سامانهٔ الکترونیکی می‌تواند با حسگر، دادهٔ محیط را بگیرد و بر پایهٔ آن واکنش نشان دهد.", "An electronic system can use sensors to take environmental data and respond to it."),
        ("رباتیک", "Robotics", "حس، تصمیم و حرکت", "sensing, decision, and movement", "ربات برای کارِ قابل اعتماد به حس کردنِ محیط، تصمیم‌گیری و حرکتِ کنترل‌شده نیاز دارد.", "A robot needs environmental sensing, decision-making, and controlled motion to work reliably."),
        ("ساختِ افزایشی", "Additive Manufacturing", "لایه، طرح و ماده", "layer, design, and material", "ساختِ افزایشی قطعه را لایه‌به‌لایه می‌سازد و امکان شکل‌های پیچیده را بیشتر می‌کند.", "Additive manufacturing builds a part layer by layer and enables more complex shapes."),
        ("موادِ مهندسی", "Engineering Materials", "فلز، بسپار و سرامیک", "metal, polymer, and ceramic", "هر گروهِ ماده میانِ استحکام، وزن، هزینه و دوام، امتیازها و محدودیت‌هایی دارد.", "Each material group has tradeoffs among strength, weight, cost, and durability."),
        ("آب و تصفیه", "Water Treatment", "فیلتراسیون، ضدعفونی و پایش", "filtration, disinfection, and monitoring", "تصفیهٔ آب چند گام دارد تا ذره‌ها، میکروب‌ها و برخی مواد ناخواسته کاهش یابند.", "Water treatment uses multiple steps to reduce particles, microbes, and some unwanted substances."),
        ("زیرساخت شهری", "Urban Infrastructure", "راه، آب و ارتباط", "road, water, and communication", "زیرساخت‌های شهر به هم وابسته‌اند و خرابیِ یک بخش می‌تواند بر بخش‌های دیگر اثر بگذارد.", "City infrastructures are interdependent, and failure in one part can affect others."),
        ("پایش و نگهداری", "Monitoring and Maintenance", "حسگر، داده و پیشگیری", "sensor, data, and prevention", "نگهداریِ پیشگیرانه با دیدن نشانه‌های کوچک، از خرابی‌های بزرگ‌تر جلوگیری می‌کند.", "Preventive maintenance uses small warning signs to avoid larger failures."),
        ("ایمنیِ مهندسی", "Engineering Safety", "خطر، افزونگی و آزمون", "hazard, redundancy, and testing", "ایمنی با شناساییِ خطر، طراحیِ افزونگی و آزمونِ پیوسته بهتر می‌شود.", "Safety improves by identifying hazards, designing redundancy, and testing continually."),
        ("انسان و فناوری", "People and Technology", "کاربر، دسترس‌پذیری و پیامد", "user, accessibility, and impact", "فناوریِ خوب باید با توانایی‌ها، نیازها و شرایطِ گوناگونِ مردم سازگار باشد.", "Good technology must fit people's varied abilities, needs, and conditions."),
        ("پایداری", "Sustainability", "چرخهٔ عمر و پیامد", "life cycle and impact", "مهندسیِ پایدار به مواد، انرژی و پسماندِ یک محصول از آغاز تا پایان نگاه می‌کند.", "Sustainable engineering considers a product's materials, energy, and waste from beginning to end."),
        ("اخلاقِ فناوری", "Technology Ethics", "فایده، آسیب و پاسخ‌گویی", "benefit, harm, and accountability", "هر تصمیم فنی باید بپرسد چه کسی سود می‌برد، چه کسی ممکن است آسیب ببیند و چه کسی پاسخ‌گوست.", "Every technical decision should ask who benefits, who may be harmed, and who is accountable."),
        ("کارِ گروهی", "Engineering Teams", "نقش، ارتباط و بازبینی", "role, communication, and review", "پروژه‌های پیچیده به نقش‌های روشن، ارتباطِ دقیق و بازبینیِ صادقانه نیاز دارند.", "Complex projects need clear roles, precise communication, and honest review."),
        ("فناوریِ آینده", "Future Technology", "پژوهش، آزمون و مسئولیت", "research, test, and responsibility", "فناوریِ تازه باید پیش از گسترش، از نظر کارکرد، ایمنی و پیامدهایش با دقت آزموده شود.", "New technology should be carefully tested for function, safety, and consequences before broad adoption."),
    ]),
]


def lines_for(title_fa, title_en, key_fa, key_en, fact_fa, fact_en):
    farsi = [
        f"در این هفته، {title_fa} را بررسی می‌کنیم.",
        f"مفهوم‌های اصلیِ این بحث {key_fa} هستند.",
        fact_fa,
        "برای فهم دقیق، مشاهده، اندازه‌گیری و مدل‌سازی باید در کنار هم به کار روند.",
        "یک نتیجهٔ علمی زمانی نیرومندتر است که با داده‌های تازه و آزمونِ مستقل سنجیده شود.",
        f"پرسشِ گفت‌وگو این است: {title_fa} چگونه بر زندگی، تصمیم یا فناوریِ ما اثر می‌گذارد؟",
    ]
    english = [
        f"This week we examine {title_en}.",
        f"The central ideas in this topic are {key_en}.",
        fact_en,
        "For precise understanding, observation, measurement, and modeling must be used together.",
        "A scientific conclusion becomes stronger when it is checked with new data and independent tests.",
        f"Discussion question: How does {title_en} affect our lives, decisions, or technology?",
    ]
    return farsi, english


def build_course(slug, category, title_fa, title_en, source_note, topics):
    weeks = []
    for number, (week_title_fa, week_title_en, key_fa, key_en, fact_fa, fact_en) in enumerate(topics, start=1):
        farsi, english = lines_for(week_title_fa, week_title_en, key_fa, key_en, fact_fa, fact_en)
        weeks.append({
            "number": number,
            "title_fa": title_fa,
            "section_fa": week_title_fa,
            "lines": [{"id": f"{number:02d}٫{index:02d}".translate(ASCII_TO_PERSIAN), "text": text, "gloss": english[index - 1]} for index, text in enumerate(farsi, start=1)],
            "vocab": [f"{fa} — {en}" for fa, en in zip(key_fa.split("، "), key_en.split(", "))],
            "note": f"Source note: {source_note}. This is an adapted Farsi study reader; read the Persian first, then use the English gloss to check meaning.",
            "student": None,
            "teacher": None,
        })
    return {"slug": slug, "category": category, "title_fa": title_fa, "title_en": title_en, "student": None, "teacher": None, "weeks": weeks}


def main():
    payload = json.loads(DATA.read_text(encoding="utf-8"))
    retained = [reader for reader in payload["readers"] if reader["slug"] not in {course[0] for course in COURSES}]
    retained.extend(build_course(*course) for course in COURSES)
    DATA.write_text(json.dumps({"readers": retained}, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"Wrote {len(COURSES)} science readers with {sum(len(course[-1]) for course in COURSES)} weekly units.")


if __name__ == "__main__":
    main()
