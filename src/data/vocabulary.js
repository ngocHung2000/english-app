const VOCABULARY_DATABASE = [
  {
    topic: "Travel",
    words: [
      { word: "itinerary", meaning: "lịch trình", ipa: "/aɪˈtɪnərəri/", example: "I planned my itinerary carefully before the trip." },
      { word: "destination", meaning: "điểm đến", ipa: "/ˌdɛstɪˈneɪʃən/", example: "Paris is a popular travel destination." },
      { word: "departure", meaning: "khởi hành", ipa: "/dɪˈpɑːrtʃər/", example: "The departure time is 8 AM." },
      { word: "arrival", meaning: "đến nơi", ipa: "/əˈraɪvəl/", example: "Our arrival was delayed by two hours." },
      { word: "passport", meaning: "hộ chiếu", ipa: "/ˈpæspɔːrt/", example: "Don't forget to bring your passport." },
      { word: "luggage", meaning: "hành lý", ipa: "/ˈlʌɡɪdʒ/", example: "I packed my luggage the night before." },
      { word: "boarding", meaning: "lên máy bay", ipa: "/ˈbɔːrdɪŋ/", example: "Boarding begins at gate 12." },
      { word: "reservation", meaning: "đặt chỗ", ipa: "/ˌrɛzərˈveɪʃən/", example: "I made a hotel reservation online." },
      { word: "currency", meaning: "tiền tệ", ipa: "/ˈkɜːrənsi/", example: "You should exchange currency before traveling." },
      { word: "accommodation", meaning: "chỗ ở", ipa: "/əˌkɒməˈdeɪʃən/", example: "We found affordable accommodation near the beach." },
      { word: "sightseeing", meaning: "tham quan", ipa: "/ˈsaɪtsiːɪŋ/", example: "We spent the day sightseeing in Rome." },
      { word: "souvenir", meaning: "quà lưu niệm", ipa: "/ˌsuːvəˈnɪr/", example: "I bought a souvenir for my family." },
      { word: "journey", meaning: "hành trình", ipa: "/ˈdʒɜːrni/", example: "The journey took about five hours." },
      { word: "terminal", meaning: "nhà ga", ipa: "/ˈtɜːrmɪnəl/", example: "We waited at terminal 3." },
      { word: "customs", meaning: "hải quan", ipa: "/ˈkʌstəmz/", example: "We went through customs after landing." }
    ]
  },
  {
    topic: "Business",
    words: [
      { word: "negotiate", meaning: "đàm phán", ipa: "/nɪˈɡoʊʃieɪt/", example: "We need to negotiate the contract terms." },
      { word: "revenue", meaning: "doanh thu", ipa: "/ˈrɛvənjuː/", example: "The company's revenue increased by 20%." },
      { word: "deadline", meaning: "hạn chót", ipa: "/ˈdɛdlaɪn/", example: "The project deadline is next Friday." },
      { word: "strategy", meaning: "chiến lược", ipa: "/ˈstrætədʒi/", example: "We developed a new marketing strategy." },
      { word: "investment", meaning: "đầu tư", ipa: "/ɪnˈvɛstmənt/", example: "This is a good investment opportunity." },
      { word: "profit", meaning: "lợi nhuận", ipa: "/ˈprɒfɪt/", example: "The company made a large profit this year." },
      { word: "colleague", meaning: "đồng nghiệp", ipa: "/ˈkɒliːɡ/", example: "My colleague helped me with the report." },
      { word: "proposal", meaning: "đề xuất", ipa: "/prəˈpoʊzəl/", example: "She submitted a business proposal." },
      { word: "stakeholder", meaning: "bên liên quan", ipa: "/ˈsteɪkˌhoʊldər/", example: "All stakeholders attended the meeting." },
      { word: "entrepreneur", meaning: "doanh nhân", ipa: "/ˌɒntrəprəˈnɜːr/", example: "She is a successful entrepreneur." },
      { word: "budget", meaning: "ngân sách", ipa: "/ˈbʌdʒɪt/", example: "We need to stay within budget." },
      { word: "merger", meaning: "sáp nhập", ipa: "/ˈmɜːrdʒər/", example: "The merger was completed last month." },
      { word: "quarterly", meaning: "hàng quý", ipa: "/ˈkwɔːrtərli/", example: "We have quarterly performance reviews." },
      { word: "outsource", meaning: "thuê ngoài", ipa: "/ˈaʊtsɔːrs/", example: "They decided to outsource IT support." },
      { word: "benchmark", meaning: "tiêu chuẩn", ipa: "/ˈbɛntʃmɑːrk/", example: "We set a benchmark for quality." }
    ]
  },
  {
    topic: "Daily Life",
    words: [
      { word: "routine", meaning: "thói quen", ipa: "/ruːˈtiːn/", example: "I follow a morning routine every day." },
      { word: "commute", meaning: "đi lại", ipa: "/kəˈmjuːt/", example: "My daily commute takes 30 minutes." },
      { word: "grocery", meaning: "tạp hóa", ipa: "/ˈɡroʊsəri/", example: "I buy groceries every weekend." },
      { word: "household", meaning: "hộ gia đình", ipa: "/ˈhaʊshoʊld/", example: "Household chores keep me busy." },
      { word: "appointment", meaning: "cuộc hẹn", ipa: "/əˈpɔɪntmənt/", example: "I have a doctor's appointment tomorrow." },
      { word: "errand", meaning: "việc vặt", ipa: "/ˈɛrənd/", example: "I need to run some errands after work." },
      { word: "chore", meaning: "công việc nhà", ipa: "/tʃɔːr/", example: "Doing chores is part of daily life." },
      { word: "leisure", meaning: "giải trí", ipa: "/ˈliːʒər/", example: "I enjoy leisure activities on weekends." },
      { word: "schedule", meaning: "lịch trình", ipa: "/ˈskɛdʒuːl/", example: "My schedule is packed this week." },
      { word: "habit", meaning: "thói quen", ipa: "/ˈhæbɪt/", example: "Reading before bed is a good habit." },
      { word: "neighbor", meaning: "hàng xóm", ipa: "/ˈneɪbər/", example: "My neighbor is very friendly." },
      { word: "laundry", meaning: "giặt giũ", ipa: "/ˈlɔːndri/", example: "I do laundry twice a week." },
      { word: "budget", meaning: "ngân sách", ipa: "/ˈbʌdʒɪt/", example: "I manage my monthly budget carefully." },
      { word: "recipe", meaning: "công thức nấu ăn", ipa: "/ˈrɛsɪpi/", example: "I tried a new recipe for dinner." },
      { word: "medication", meaning: "thuốc", ipa: "/ˌmɛdɪˈkeɪʃən/", example: "Take your medication after meals." }
    ]
  },
  {
    topic: "Technology",
    words: [
      { word: "algorithm", meaning: "thuật toán", ipa: "/ˈælɡərɪðəm/", example: "The algorithm sorts data efficiently." },
      { word: "database", meaning: "cơ sở dữ liệu", ipa: "/ˈdeɪtəbeɪs/", example: "All records are stored in the database." },
      { word: "bandwidth", meaning: "băng thông", ipa: "/ˈbændwɪdθ/", example: "We need more bandwidth for video calls." },
      { word: "encryption", meaning: "mã hóa", ipa: "/ɪnˈkrɪpʃən/", example: "Encryption keeps your data safe." },
      { word: "interface", meaning: "giao diện", ipa: "/ˈɪntərfeɪs/", example: "The user interface is easy to navigate." },
      { word: "compatible", meaning: "tương thích", ipa: "/kəmˈpætɪbəl/", example: "This software is compatible with Windows." },
      { word: "download", meaning: "tải xuống", ipa: "/ˈdaʊnloʊd/", example: "You can download the app for free." },
      { word: "optimize", meaning: "tối ưu hóa", ipa: "/ˈɒptɪmaɪz/", example: "We need to optimize our website speed." },
      { word: "virtual", meaning: "ảo", ipa: "/ˈvɜːrtʃuəl/", example: "We had a virtual meeting today." },
      { word: "debug", meaning: "gỡ lỗi", ipa: "/diːˈbʌɡ/", example: "I spent hours trying to debug the code." },
      { word: "repository", meaning: "kho lưu trữ", ipa: "/rɪˈpɒzɪtɔːri/", example: "Push your code to the repository." },
      { word: "firmware", meaning: "phần sụn", ipa: "/ˈfɜːrmwɛr/", example: "Update the firmware to fix the bug." },
      { word: "authentication", meaning: "xác thực", ipa: "/ɔːˌθɛntɪˈkeɪʃən/", example: "Two-factor authentication adds security." },
      { word: "scalable", meaning: "có thể mở rộng", ipa: "/ˈskeɪləbəl/", example: "The architecture is highly scalable." },
      { word: "latency", meaning: "độ trễ", ipa: "/ˈleɪtənsi/", example: "Low latency is crucial for gaming." }
    ]
  },
  {
    topic: "Health",
    words: [
      { word: "symptom", meaning: "triệu chứng", ipa: "/ˈsɪmptəm/", example: "Fever is a common symptom of the flu." },
      { word: "diagnosis", meaning: "chẩn đoán", ipa: "/ˌdaɪəɡˈnoʊsɪs/", example: "The doctor gave an accurate diagnosis." },
      { word: "prescription", meaning: "đơn thuốc", ipa: "/prɪˈskrɪpʃən/", example: "The pharmacist filled my prescription." },
      { word: "nutrition", meaning: "dinh dưỡng", ipa: "/njuːˈtrɪʃən/", example: "Good nutrition is essential for health." },
      { word: "therapy", meaning: "liệu pháp", ipa: "/ˈθɛrəpi/", example: "Physical therapy helped my recovery." },
      { word: "immunity", meaning: "miễn dịch", ipa: "/ɪˈmjuːnɪti/", example: "Vaccines boost your immunity." },
      { word: "allergy", meaning: "dị ứng", ipa: "/ˈælɜːrdʒi/", example: "She has a peanut allergy." },
      { word: "chronic", meaning: "mãn tính", ipa: "/ˈkrɒnɪk/", example: "He suffers from chronic back pain." },
      { word: "hygiene", meaning: "vệ sinh", ipa: "/ˈhaɪdʒiːn/", example: "Good hygiene prevents disease." },
      { word: "vaccine", meaning: "vắc-xin", ipa: "/vækˈsiːn/", example: "The vaccine is safe and effective." },
      { word: "dosage", meaning: "liều lượng", ipa: "/ˈdoʊsɪdʒ/", example: "Follow the recommended dosage." },
      { word: "wellness", meaning: "sức khỏe", ipa: "/ˈwɛlnɪs/", example: "The wellness program includes yoga." },
      { word: "fatigue", meaning: "mệt mỏi", ipa: "/fəˈtiːɡ/", example: "Fatigue can affect your performance." },
      { word: "supplement", meaning: "thực phẩm bổ sung", ipa: "/ˈsʌplɪmənt/", example: "I take vitamin supplements daily." },
      { word: "rehabilitation", meaning: "phục hồi chức năng", ipa: "/ˌriːəˌbɪlɪˈteɪʃən/", example: "Rehabilitation takes time and patience." }
    ]
  },
  {
    topic: "Education",
    words: [
      { word: "curriculum", meaning: "chương trình giảng dạy", ipa: "/kəˈrɪkjʊləm/", example: "The school updated its curriculum." },
      { word: "scholarship", meaning: "học bổng", ipa: "/ˈskɒlərʃɪp/", example: "She won a full scholarship." },
      { word: "assignment", meaning: "bài tập", ipa: "/əˈsaɪnmənt/", example: "The assignment is due tomorrow." },
      { word: "lecture", meaning: "bài giảng", ipa: "/ˈlɛktʃər/", example: "The lecture was very informative." },
      { word: "semester", meaning: "học kỳ", ipa: "/sɪˈmɛstər/", example: "The fall semester starts in September." },
      { word: "tuition", meaning: "học phí", ipa: "/tjuːˈɪʃən/", example: "Tuition fees have increased." },
      { word: "diploma", meaning: "bằng cấp", ipa: "/dɪˈploʊmə/", example: "He received his diploma at graduation." },
      { word: "enrollment", meaning: "ghi danh", ipa: "/ɪnˈroʊlmənt/", example: "Enrollment opens next week." },
      { word: "thesis", meaning: "luận văn", ipa: "/ˈθiːsɪs/", example: "She is writing her thesis on AI." },
      { word: "campus", meaning: "khuôn viên", ipa: "/ˈkæmpəs/", example: "The campus has a beautiful library." },
      { word: "syllabus", meaning: "đề cương", ipa: "/ˈsɪləbəs/", example: "The syllabus outlines the course topics." },
      { word: "workshop", meaning: "hội thảo", ipa: "/ˈwɜːrkʃɒp/", example: "I attended a writing workshop." },
      { word: "plagiarism", meaning: "đạo văn", ipa: "/ˈpleɪdʒərɪzəm/", example: "Plagiarism is a serious offense." },
      { word: "extracurricular", meaning: "ngoại khóa", ipa: "/ˌɛkstrəkəˈrɪkjʊlər/", example: "She joined extracurricular activities." },
      { word: "assessment", meaning: "đánh giá", ipa: "/əˈsɛsmənt/", example: "The assessment will be next week." }
    ]
  },
  {
    topic: "Food & Cooking",
    words: [
      { word: "ingredient", meaning: "nguyên liệu", ipa: "/ɪnˈɡriːdiənt/", example: "Fresh ingredients make better dishes." },
      { word: "cuisine", meaning: "ẩm thực", ipa: "/kwɪˈziːn/", example: "Vietnamese cuisine is delicious." },
      { word: "appetizer", meaning: "món khai vị", ipa: "/ˈæpɪtaɪzər/", example: "We ordered an appetizer to share." },
      { word: "portion", meaning: "khẩu phần", ipa: "/ˈpɔːrʃən/", example: "The portions were very generous." },
      { word: "seasoning", meaning: "gia vị", ipa: "/ˈsiːzənɪŋ/", example: "Add seasoning to taste." },
      { word: "marinate", meaning: "ướp", ipa: "/ˈmærɪneɪt/", example: "Marinate the chicken for two hours." },
      { word: "simmer", meaning: "ninh nhỏ lửa", ipa: "/ˈsɪmər/", example: "Let the soup simmer for 20 minutes." },
      { word: "garnish", meaning: "trang trí món ăn", ipa: "/ˈɡɑːrnɪʃ/", example: "Garnish with fresh herbs." },
      { word: "beverage", meaning: "đồ uống", ipa: "/ˈbɛvərɪdʒ/", example: "Would you like a beverage with your meal?" },
      { word: "utensil", meaning: "dụng cụ", ipa: "/juːˈtɛnsəl/", example: "Keep cooking utensils clean." },
      { word: "organic", meaning: "hữu cơ", ipa: "/ɔːrˈɡænɪk/", example: "I prefer organic vegetables." },
      { word: "nutrition", meaning: "dinh dưỡng", ipa: "/njuːˈtrɪʃən/", example: "Check the nutrition label." },
      { word: "ferment", meaning: "lên men", ipa: "/fərˈmɛnt/", example: "Yogurt is made by fermenting milk." },
      { word: "pastry", meaning: "bánh ngọt", ipa: "/ˈpeɪstri/", example: "The bakery has delicious pastries." },
      { word: "savor", meaning: "thưởng thức", ipa: "/ˈseɪvər/", example: "Savor every bite of the meal." }
    ]
  }
];

export default VOCABULARY_DATABASE;
