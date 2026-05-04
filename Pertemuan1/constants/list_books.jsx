const ListBook = [
  {
    id: 1,
    title: "Bumi Manusia",
    img: require("../assets/books/bumi-manusia.png"),
    author: "Pramoedya Ananta Toer",
    rating: 5,
    views: 100,
    created_at: "2024-06-23 10:00",
    is_free: true,
    language: "en-US",
    sinopsis:
      "This charming tale follows Gerald the giraffe, who feels left out at the Jungle Dance because of his clumsy dancing. With the help of a wise friend, Gerald learns that sometimes it just takes a different tune to find your rhythm and dance to your own beat.",
    story:
      "In the heart of the jungle, Gerald the giraffe watches his animal friends dance gracefully at the annual Jungle Dance. Despite his longing to join in, Gerald feels self-conscious about his awkward dancing. The other animals mock him, and Gerald retreats into sadness. Just when he's about to give up, a wise cricket appears and teaches Gerald that everyone can dance when they find music that speaks to their heart. With newfound confidence, Gerald discovers his unique rhythm and dances joyfully under the moonlit sky, inspiring others to embrace their differences and dance to their own tune.",
  },
  {
    id: 2,
    title: "The Kite Runner",
    img: require("../assets/books/kite-runner.png"),
    author: "Khaled Hosseini",
    rating: 5,
    views: 999,
    is_free: true,
    language: "id-ID",
    sinopsis:
      "Bercerita tentang seseorang yang takut memulai hubungan kembali karena terlalu kecewa dengan kisah cinta sebelumnya. Kekecewaan yang dirasakan menimbulkan ketakutan saat menjalin hubungan yang baru.",
    story:
      "Lama kuputuskan tak membuka diri. Lama kubiarkan hati tak berpenghuni. Meski banyak yang singgah, Tiada yang mampu hilangkan bayang-bayang kecewa. Dalam luka ini tak terbendung lagi, Dalam hati ini duka jadi penghuni. Tak bisa kupungkiri, Kini sinis kumemandang teman hati berjanji. Kaulah alasan kutak lagi percaya cinta, Kau yang selalu membuatku nyaman dengan kecewa, Telah terkunci takkan mudah membuka hati ini. Dan tak berani kuberharap lagi. Cinta yang kau suguhkan, Tak layak kuterima, Terlalu lama tuk menyadari semua. Yang kucari kini, Sebuah cara tuk bisa lepas Dari sgala kecewa tuk bahagia. Kaulah alasan kutak lagi percaya cinta, Kau yang selalu membuatku nyaman dengan kecewa, Kau telah terkunci takkan mudah membuka hati ini, Dan tak berani kuberharap lagi. Kau yang selalu membuatku nyaman dengan kecewa, Kau telah terkunci, takkan mudah membuka hati ini, Dan tak berani kuberharap lagi.",
  },
  {
    id: 3,
    title: "Sapiens: A Brief History of Humankind",
    img: require("../assets/books/sapiens.png"),
    author: "Yuval Noah Harari",
    rating: 3,
    views: 50,
    is_free: false,
    language: "en-US",
    sinopsis:
      "Antoine de Saint-Exupéry's timeless classic tells the story of a young prince who travels from planet to planet, meeting a variety of characters and learning important life lessons along the way. Through his encounters, he discovers the value of love, friendship, and the beauty of innocence.",
    story:
      "In the vast expanse of the universe, a young prince embarks on a journey from his tiny planet to explore the mysteries of the cosmos. Along the way, he encounters quirky inhabitants of various planets, each with their own peculiarities and wisdom. Through his adventures, the little prince learns profound truths about human nature, the importance of love and friendship, and the beauty of seeing the world through the eyes of innocence. Ultimately, he discovers that what truly matters cannot be seen with the eyes but felt with the heart.",
  },
  {
    id: 4,
    title: "Catatan Seorang Demonstran",
    img: require("../assets/books/catatan-demonstran.png"),
    author: "Soe Hok Gie",
    rating: 5,
    views: 160,
    is_free: false,
    language: "en-US",
    sinopsis:
      "This heartwarming book introduces the concept of 'bucket filling' as a metaphor for expressing kindness and appreciation towards others. Through simple yet profound illustrations and language, readers learn the power of empathy, compassion, and positivity in filling not only others' buckets but also their own.",
    story:
      "In a world where everyone carries an invisible bucket, young Felix learns the importance of filling others' buckets with acts of kindness and positivity. Inspired by his teacher's metaphorical lesson, Felix sets out on a mission to spread joy and happiness wherever he goes. From complimenting a classmate to helping a friend in need, Felix discovers that small gestures can have a big impact on others' well-being. As he fills the buckets of those around him, Felix realizes that his own bucket is overflowing with happiness, proving that kindness is contagious and that the more you give, the more you receive.",
  },
  {
    id: 5,
    title: "Salt to the Sea",
    img: require("../assets/books/salt-sea.png"),
    author: "Jegung Wicaksono",
    rating: 4,
    views: 33,
    is_free: false,
    language: "id-ID",
    sinopsis:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio ad reprehenderit eius consequatur ea! Enim, tempore. Dolores unde ipsam fugiat, repellendus laborum numquam sequi impedit porro dolorem eveniet laudantium ex.",
    story:
      "Sebagai bakti gue pada tanah air dan tanggung jawab gue sebagai mahasiswa. Kini saatnya gue berangkat untuk menunaikan ibadah KKN. Jadi gue harus segera menyelesaikan Kuliah Kerja Nyata ini. Gue pikir setelah KKN gue bakal dapet hadiah gadis cantik dan manis dari desa. Gue pikir setelah KKN gue bakal rajin bersih-bersih rumah. Gue pikir setelah KKN gue bakal cepet lulus kuliah dengan nilai cemerlang.",
  },
  {
    id: 7,
    title: "Malin Kundang Anak Durhaka",
    img: require("../assets/books/malin-kundang.png"),
    author: "R. J. Palacio",
    rating: 5,
    views: 230,
    is_free: false,
    language: "en-US",
    sinopsis:
      "R.J. Palacio's poignant novel tells the story of Auggie Pullman, a young boy with a facial deformity who enters mainstream school for the first time in fifth grade. Through multiple perspectives, readers witness Auggie's journey of self-discovery, friendship, and acceptance, as he teaches those around him the true meaning of kindness and empathy.",
    story:
      "Auggie Pullman, born with a facial deformity, has always been homeschooled to shield him from stares and judgment. But as he enters fifth grade, his parents enroll him in a mainstream school, where he faces the challenges of fitting in and overcoming prejudice. Despite initial setbacks and cruel taunts from classmates, Auggie's resilience and inner strength shine through as he forges unlikely friendships and wins over hearts with his courage and kindness. Through the alternating perspectives of Auggie, his family, and peers, readers gain insight into the complexities of acceptance and empathy, and the transformative power of choosing kindness in the face of adversity.",
  },
];

export { ListBook };