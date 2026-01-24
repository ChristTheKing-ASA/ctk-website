// Church information and content data

export const churchInfo = {
  name: "Christ the King Anglican Church",
  shortName: "CTK",
  phone: "904.460.2318",
  email: "craig@ctkasa.com",
  adminEmail: "thusberg@bellsouth.net",
  address: {
    street: "6900 US-1 South",
    city: "St. Augustine",
    state: "FL",
    zip: "32086",
    mailing: "PO Box 1657, St Augustine, FL 32085",
  },
  serviceTime: "Sundays at 10:00 AM",
  diocese: {
    name: "Gulf Atlantic Diocese",
    url: "https://gulfatlanticdiocese.org/",
    bishop: "The Right Reverend Alex Farmer",
  },
  denomination: {
    name: "Anglican Church in North America",
    shortName: "ACNA",
    url: "https://anglicanchurch.net/",
  },
  social: {
    facebook: "https://facebook.com/ctkanglicanstaugustineflorida",
    youtube: "https://youtube.com/@christthekinganglicanstaugustine",
    instagram: "https://instagram.com/ctkasa",
  },
  giving: {
    platform: "Kindrid",
    url: "https://kindridgiving.com/app/giving/ctkasa",
    appUrl: "https://kindrid.ministryone.com/landing/pEOq",
  },
  mission: {
    pillars: [
      {
        title: "Love God",
        description: "With all your heart, soul, mind, and strength",
        icon: "Heart",
      },
      {
        title: "Become Disciples",
        description: "Growing in spiritual maturity modeled on Christ",
        icon: "BookOpen",
      },
      {
        title: "Serve Others",
        description: "Expressing divine love through humble service",
        icon: "HandHeart",
      },
    ],
    vision: "To be co-workers with Christ in the Kingdom of God",
  },
  scripture: {
    main: {
      text: "The grace of our Lord Jesus Christ be with you.",
      reference: "1 Thessalonians 5:28",
    },
    about: {
      text: "Jesus replied: 'Love the Lord your God with all your heart and with all your soul and with all your mind.' This is the first and greatest commandment.",
      reference: "Matthew 22:37-38",
    },
  },
};

export const navigation = [
  { name: "Visit", href: "/visit" },
  { name: "Worship", href: "/worship" },
  { name: "Connect", href: "/connect" },
  { name: "Serve", href: "/serve" },
  { name: "DeafChurch", href: "/deafchurch" },
  { name: "About", href: "/about" },
];

export const clergy = [
  {
    slug: "craig-sanders",
    name: "The Rev. Dr. Craig Sanders",
    title: "Rector",
    email: "craig@ctkasa.com",
    image: "/images/team/staff-photo.jpeg",
    shortBio: "Leading CTK with a passion for Scripture and Anglican tradition.",
    fullBio: `Fr. Craig moved from Loganville, Georgia, where he served at Holy Cross Anglican Cathedral. He was previously ordained in the Diocese of the Rocky Mountains and holds a PhD in Christian Theology from Saint Louis University.

His journey to Anglicanism was shaped by a deep love for Scripture. As he writes: "I wanted to eat, sleep, and breathe the Bible. The Anglican tradition provided a trustworthy model for patterning my life around Scripture, forming in me Bible-shaped worship and prayer."

Fr. Craig's grandmother, his "MawMaw" Hazel Sanders Ridgeway, was instrumental in his faith formation. Her gift of an Apologetics Study Bible during his senior year of high school set him on a lifelong journey to inhabit Scripture.`,
    family: "Married to Kaitlyn with children Auggie and Elowyn",
    education: ["PhD in Christian Theology, Saint Louis University"],
    quote: {
      text: "I wanted to eat, sleep, and breathe the Bible. The Anglican tradition provided a trustworthy model for patterning my life around Scripture, forming in me Bible-shaped worship and prayer.",
      source: "Heaven in Ordinary newsletter",
    },
  },
  {
    slug: "bob-ayres",
    name: "The Rev. Dr. Bob Ayres",
    title: "Assisting Priest | Founder, DeafChurch Together",
    email: "bob.ayres@deafchurchtogether.com",
    image: "/images/team/revs-kathy-bob-ayres.jpg",
    shortBio: "Pioneering Deaf ministry through DeafChurch Together.",
    fullBio: `Fr. Bob is the founding pastor of DeafChurch Together, an online liturgical expression of the Christian faith in the Anglican tradition serving the Deaf community.

He and his wife Deacon Kathy have been involved in Deaf ministry since the mid-1980s. In 2000, they established Deaf Teen Quest (DTQ), now a national ministry model for Youth For Christ USA.

Fr. Bob has published two books on Deaf ministry including "DEAFCHURCH 21: Vision for a New Generation." In May 2020, he launched an online weekly liturgical service in American Sign Language.

God has stirred up a vision in Fr. Bob's heart for establishing a regional Deaf Liturgical Church movement based on the model of multiple sites as part of a single parish. CTK serves as an Anchor Church in this movement.`,
    family: "Six adopted adult children (two of whom are Deaf) and twelve grandchildren",
    publications: ["DEAFCHURCH 21: Vision for a New Generation"],
  },
  {
    slug: "donald-wilson",
    name: "The Rev. Donald Wilson",
    title: "Assisting Priest",
    image: "/images/team/wilson.jpg",
    shortBio: "Teaching biblical financial principles and serving the community.",
    fullBio: `Fr. Donald was born in 1959 as a South Florida native. He was ordained Deacon in 2005 and Priest in 2006 through UECNA seminary training.

He joined Christ The King in 2021 after retiring from cattle ranching and general employment. Fr. Donald has a passion for teaching biblical financial principles to help congregation members steward their resources wisely.`,
    family: "Two grown daughters",
    ministry: "Biblical financial principles",
  },
  {
    slug: "langdon-pegram",
    name: "The Rev. Langdon Pegram",
    title: "Assisting Priest | Director of Safeguarding",
    image: "/images/team/pegram.jpg",
    shortBio: "Former Mayo Clinic pediatrician serving God's people.",
    fullBio: `Fr. Langdon graduated from Texas A&M College of Medicine in 1984 and completed his pediatric residency at the Mayo Clinic. He served three years in the Air Force at Kadena Air Base in Okinawa.

He attended Trinity School for Ministry in 1997 and was ordained Deacon and Priest in 2000. Fr. Langdon served as rector of Christ Church, New Brighton, PA for over 19 years before retiring to DeLand, Florida.

At CTK, he serves as Director of Safeguarding, overseeing the MinistrySafe training program for all volunteers who work with children and youth.`,
    family: "Two grown sons and two step-grandchildren",
    education: [
      "Texas A&M College of Medicine (1984)",
      "Pediatric Residency, Mayo Clinic",
      "Trinity School for Ministry (1997)",
    ],
  },
  {
    slug: "barb-mcmillen",
    name: "The Rev. Barb McMillen",
    title: "Deacon",
    email: "chaplainbarbm@gmail.com",
    phone: "724-344-9241",
    image: "/images/team/mcmillen.jpg",
    shortBio: "Serving seasonally in Florida and Pennsylvania.",
    fullBio: `Deacon Barb joined Christ The King in 2016. She attended Trinity School for Ministry and was ordained as a Vocational Deacon in 2015.

She serves winters in Florida and summers in Pennsylvania, bringing her gifts of hospitality and pastoral care to both communities. Deacon Barb is also a contact person for the Daughters of the Holy Cross Faith Chapter.`,
    family: "Married to Chuck since 1968, four children (one deceased), three grandchildren",
    education: ["Trinity School for Ministry"],
  },
  {
    slug: "david-allert",
    name: "The Rev. David C. Allert",
    title: "Rector Emeritus",
    email: "FrDavid@ctkasa.com",
    phone: "904.377.3726",
    image: "/images/team/allert.jpg",
    shortBio: "Former rector with a heart for reconciliation.",
    fullBio: `Fr. David attended Trinity School for Ministry and received his Master of Divinity degree in 1999. He served at Trinity Episcopal Parish and St. Cyprian Episcopal Church before being called as rector of CTK in 2006.

His personal ministry vision focuses on reconciliation—bringing people together and helping heal divisions. Born in Grenada, he emigrated to England as a child and has been a resident in the USA since 1990.`,
    family: "Married to Heather since 1987, three children (Grace, Isaac, Sophie), one grandchild (Carter)",
    education: ["Master of Divinity, Trinity School for Ministry (1999)"],
    ministry: "Reconciliation",
  },
];

export const beliefs = {
  intro: "Christ the King holds to the historic Anglican faith as expressed in the following:",
  foundations: [
    {
      title: "Scripture",
      description: "The canonical books of the Old and New Testaments as the inspired Word of God, containing all things necessary for salvation.",
    },
    {
      title: "Sacraments",
      description: "Baptism and the Holy Communion (Eucharist) as the two sacraments ordained by Christ himself.",
    },
    {
      title: "Historic Episcopate",
      description: "The Historic Episcopate as integral to the apostolic faith and practice.",
    },
    {
      title: "The Creeds",
      description: "The three Catholic Creeds: the Apostles' Creed, the Nicene Creed, and the Athanasian Creed.",
    },
    {
      title: "Church Councils",
      description: "The teaching of the first four Councils of the undivided Church, and the Christological clarifications of councils five through seven.",
    },
    {
      title: "Book of Common Prayer",
      description: "The 1662 Book of Common Prayer as the doctrinal standard for Anglican worship.",
    },
    {
      title: "Thirty-Nine Articles",
      description: "The Thirty-Nine Articles of Religion (1571) as expressing authentic Anglican belief.",
    },
  ],
};

export const weeklyActivities = [
  {
    title: "Sunday Worship",
    day: "Sundays",
    time: "10:00 AM",
    description: "Holy Eucharist with blended traditional and contemporary worship",
    location: "In-person & YouTube Livestream",
  },
  {
    title: "Morning Prayer",
    day: "Tuesdays",
    time: "10:00 AM",
    description: "Join us for a time of prayer following the Daily Office",
    location: "In-person",
  },
  {
    title: "Bible Study",
    day: "Wednesdays",
    time: "6:30 PM",
    description: "Currently studying Max Lucado's 'Life Lessons from Psalms' (12-week study, $7 book)",
    location: "Via Zoom",
    contacts: [
      { name: "Deacon Barb", phone: "724.344.9241", email: "chaplainbarbm@gmail.com" },
      { name: "Terri", phone: "904.460.2318", email: "thusberg@bellsouth.net" },
    ],
  },
];

export const volunteerRoles = {
  categories: [
    {
      name: "Children & Youth",
      roles: [
        { title: "Sunday School Teachers", description: "Rotating instructors for elementary ages (K-5th grade)", requiresTraining: true },
        { title: "Sunday School Assistants", description: "Second adult in classroom support", requiresTraining: true },
        { title: "Nursery Volunteers", description: "Rotating teams of two caring for infants through kindergarten", requiresTraining: true },
      ],
    },
    {
      name: "Music & Worship",
      roles: [
        { title: "Music Team", description: "Share your musical talents in worship" },
        { title: "Sound Technicians", description: "Manage sound board and live streaming (honorarium provided)" },
        { title: "Visual Technicians", description: "PowerPoint preparation and video camera operation" },
      ],
    },
    {
      name: "Sunday Servants",
      roles: [
        { title: "Acolytes & Crucifers", description: "Altar servers of all ages on rotating basis" },
        { title: "Altar Guild", description: "Teams preparing altar and caring for vestments" },
        { title: "Altar Flower Ministry", description: "Weekly flower purchasing and arrangement" },
        { title: "Greeters", description: "Welcome parishioners and visitors" },
        { title: "Hospitality", description: "Serve refreshments after Sunday service" },
        { title: "Ushers/Oblation Bearers", description: "Seat attendees, count attendance, present offerings" },
      ],
    },
    {
      name: "Facilities",
      roles: [
        { title: "Cleaning/Maintenance", description: "General upkeep on as-needed basis" },
        { title: "Gardening and Grounds", description: "Planting, pruning, watering, weeding" },
        { title: "Kitchen Cleaning Crew", description: "Quarterly deep cleaning" },
      ],
    },
    {
      name: "Missions & Events",
      roles: [
        { title: "Short-Term Missions", description: "Domestic and international service trips" },
        { title: "Special Events", description: "Baking, cooking, serving, setup for events and retreats" },
      ],
    },
  ],
};

export const missionPartners = {
  local: [
    {
      slug: "alpha-omega-miracle-home",
      name: "Alpha-Omega Miracle Home",
      category: "Local",
      shortDescription: "Housing and support for homeless single mothers, children, and senior women.",
      fullDescription: `Alpha-Omega Miracle Home provides housing, counseling and spiritual guidance, as well as education and employment assistance for the new faces of homelessness – single mothers, their children and senior women.

Guided by caring and compassionate professionals, these women experience family and the miracle of home in a safe and supportive environment. Through this comprehensive program, the residents leave chaos and uncertainty behind to find purpose and prepare for a new beginning.

Alpha-Omega Miracle Home is more than a place to stay, it's a place to start.`,
    },
    {
      slug: "grace-community-food-pantry",
      name: "Grace Community Food Pantry",
      category: "Local",
      shortDescription: "Feeding Flagler County's food-insecure residents.",
      fullDescription: `The mission of Grace Community Food Pantry is to assist in feeding Flagler County's less fortunate until they are able to feed themselves.

In partnership with Flagler County School District they work together to provide nourishment and reduce food insecurity in Flagler County. This is a Christian based ministry supported cross-denominationally and through various community organizations, governmental agencies, local businesses, and an ever-increasing number of individual supporters, volunteers and contributors.`,
    },
    {
      slug: "somebody-cares",
      name: "Somebody Cares St. Augustine",
      subtitle: "Homeless Student Fund",
      category: "Local",
      shortDescription: "Providing essentials for 500+ homeless students in St. Johns County.",
      fullDescription: `In 2011, Somebody Cares St. Augustine joined forces with the St. Johns County School District to help provide for the over 500 homeless students in our county.

Since then, we have supplied shoes, clothes, handicapped equipment, and we have tried to meet every need that has been brought to us, and we want to continue to help these students who are staying in school under the most difficult circumstances.`,
    },
    {
      slug: "st-francis-house",
      name: "St. Francis House",
      category: "Local",
      shortDescription: "Engaging homeless individuals toward stability and self-sufficiency.",
      fullDescription: `The St. Francis House mission is to engage the homeless in achieving stability, self-sufficiency and a viable plan for their future by providing a safe, stable environment, access to essential services, supportive connections, and to advocate for changes that address the needs of the homeless population.

Services and programs include:

**Housing Crisis Center** — serving those facing the crisis of homelessness through programs at their Washington Street campus, providing emergency shelter, basic needs and housing-focused, case management services for individuals and families.

**SOS – Street Outreach Services** — teams traveling throughout St. Johns County where the homeless live and congregate to develop trust and break down barriers.

**SOS – Youth Street Outreach** — engaging youth living on the street with services that promote safety, well-being, and permanent connections with caring adults.`,
    },
  ],
  national: [
    {
      slug: "church-army-usa",
      name: "Church Army USA (CAUSA)",
      category: "National",
      shortDescription: "Evangelists expressing the Gospel in tangible ways to the marginalized.",
      fullDescription: `CAUSA is an organization of evangelists expressing the Gospel of Jesus Christ in tangible ways to bring transformation.

Their commitment is to serving, reaching and loving broken, rejected, sad, disconnected and hurting people with a message of hope, love, and joy. They are at the center of evangelism and on the edges of society.

They specialize in working outside of church buildings through addiction centers, urban farming, jails and prisons, café ministries, streets and back alleys, schools, senior centers, hospitals, nursing homes, housing developments and more.`,
    },
    {
      slug: "trinity-seminary",
      name: "Trinity Anglican Seminary",
      category: "National",
      shortDescription: "Forming Christian leaders for mission in the Anglican tradition.",
      fullDescription: `Trinity Anglican Seminary is an evangelical seminary in the Anglican tradition. They desire to be a global center for Christian formation, producing outstanding leaders who can plant, renew, and grow churches that make disciples of Jesus Christ.

They welcome students and faculty who long for a Church that is evangelical in faith, catholic in order, and Spirit-driven in mission. They stand in the great Anglican Evangelical tradition rooted in the primacy of the scriptures and salvation by grace alone through faith alone.

**CTK Connection:** Fr. David, Deacon Barb, and Fr. Langdon are all alumni of Trinity School for Ministry.`,
    },
  ],
  global: [
    {
      slug: "anglican-frontier-missions",
      name: "Anglican Frontier Missions (AFM)",
      category: "Global",
      shortDescription: "Planting churches among 3 billion unreached people worldwide.",
      fullDescription: `AFM is committed to going where the need is greatest, planting biblically-based, multiplying, indigenous churches where the church is not yet established, among the 3 billion people and 7,000 unreached people groups still waiting to hear the gospel for the very first time.

Partnering with members of the worldwide Anglican Communion and other Christians who live near or among unreached peoples, AFM equips and sends short-term and long-term missionaries who harness the spiritually formational power, practices, and rhythms of the sacraments, liturgy and the prayer book tradition to disciple believers from Muslim, Hindu, Buddhist, animistic, and secular backgrounds.`,
    },
    {
      slug: "cms-sandifers",
      name: "Church Missionary Society",
      subtitle: "David and Cathie Sandifer, Missionaries to Amsterdam",
      category: "Global",
      shortDescription: "Equipping the next generation of European church leaders.",
      fullDescription: `CMS is a fellowship of Christian people committed to cross-cultural mission. CMS works with churches to set apart, equip and support long-term workers who cross cultures to share the gospel.

The Rev. David Sandifer and his wife Cathie, along with their children Annabelle and Josiah, are serving the Lord in Amsterdam through CMS.

David and Cathie's mission at Tyndale Theological Seminary in the Netherlands is to help raise up a new generation of European leaders to equip and renew God's church. David serves as a lecturer in Pastoral Ministry and Christian Ethics, particularly involved in equipping students to deepen their biblical worldview in response to contemporary secularism. Cathie serves in pastoral care with students and in the local church.`,
    },
    {
      slug: "marsabit-kenya",
      name: "Diocese of Marsabit, Kenya",
      subtitle: "Bishop Daniel Qampicha",
      category: "Global",
      shortDescription: "Supporting a vast diocese in Northern Kenya through drought and hardship.",
      fullDescription: `The Diocese of Marsabit spans a vast area in Northern Kenya. Prolonged drought has caused the loss of 80% of the livestock, leaving people starving and in a dire situation. Bishop Qampicha reports that immediate aid will help to feed the hungry.

**Ongoing Needs:**
- Livestock recovery support
- Bicycles to help clergy cover vast territory (currently covered on foot)
- Scholarships for students to attend high schools
- Clergy stipends`,
    },
    {
      slug: "heart-of-gold-nigeria",
      name: "Heart of Gold Widows & Orphans Development Foundation",
      category: "Global",
      shortDescription: "Ministry to widows and orphans facing stigmatization in Nigeria.",
      fullDescription: `The Heart of Gold Widows and Orphans Development Foundation in Nigeria is a ministry that developed in response to the plight of those who suddenly become the breadwinners of their families due to the passing on of their husbands.

The trauma they go through is underlined by lack and societal negative perception. The foundation is premised on the desire to relieve widows and orphans from ill-treatment, neglect and stigmatization in Nigerian societies in accordance with James 1:27: "Look after orphans and widows in their distress."

**Programs include:**
- Sharing the love and knowledge of God
- Loan programs to enable widows to learn a trade and become self-sufficient
- Scholarships to allow orphans to continue their education`,
    },
  ],
  additional: [
    { name: "Anglican Relief and Development Fund", type: "Disaster Relief" },
    { name: "Operation Christmas Child", type: "Samaritan's Purse" },
    { name: "Gideons International", type: "Bible Distribution" },
    { name: "Homeless Coalition of St. Johns County", type: "Local" },
    { name: "CMJ USA", type: "Jewish Ministry" },
  ],
};

export const deafChurch = {
  name: "DeafChurch First Coast",
  tagline: "Bringing Anglican worship to the Deaf community in American Sign Language",
  description: `DeafChurch First Coast is a church plant serving the Deaf Community across Northeast Florida. Christ the King serves as an Anchor Church in the DeafChurch Together movement, helping establish in-person community in addition to online worship.`,
  model: {
    title: "DeafChurch Together Model",
    description: `"DeafChurch Together" is an online liturgical expression of the Christian faith in the Anglican tradition. The model establishes a regional Deaf Liturgical Church movement based on multiple sites as part of a single parish, connecting Deaf communities with Anglican anchor churches.`,
  },
  history: `Fr. Bob and Kathy Ayres have been involved in Deaf ministry since the middle 1980s. In 2000, they established Deaf Teen Quest (DTQ), now a national ministry model for Youth For Christ USA.

In May 2020, Fr. Bob launched an online weekly liturgical service in American Sign Language. This grew into a vision for establishing a regional Deaf Liturgical Church movement.`,
  founders: {
    primary: "The Rev. Dr. Bob Ayres",
    secondary: "Deacon Kathy Ayres",
    email: "bob.ayres@deafchurchtogether.com",
  },
  publication: {
    title: "DEAFCHURCH 21: Vision for a New Generation",
    author: "Fr. Bob Ayres",
  },
  services: {
    description: "Weekly liturgical services in American Sign Language",
    platform: "YouTube",
  },
  familyInfo: "Fr. Bob and Kathy have six adopted adult children (two of whom are Deaf) and 12 grandchildren.",
};
