import { PlaceTitle } from "../enums/enums";

const places = [
	{
		title: PlaceTitle.LYADSKY_GATE,
		description: `Lach Gates (Ukrainian: Лядські ворота) at Independence Square in Kyiv is a monument built in 2001 to commemorate one of the Medieval Kyiv city gates. At the top is a sculpture of Archangel Michael which is the city's symbol.

The gates were located in the former city's Polish quarter on the southeast side of Kyiv. According to Primary Chronicle, in 1240 the Lach Gates became the main fortification where Batu Khan concentrated his assault during the 1240 siege of Kyiv.

Lach gates were one of three known gates of Medieval Kyiv (Old Kyiv), the others being the Golden Gate and the Jewish (Lviv) Gates.`,
		address: "1 Nezalezhnosti maidan",
		thumbnailLink:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Kij%C3%B3w%2C_Kiev%2C_%22Maidan%22._-_panoramio_%281%29.jpg/800px-Kij%C3%B3w%2C_Kiev%2C_%22Maidan%22._-_panoramio_%281%29.jpg",
		lat: 50.4509266,
		lng: 30.522968,
	},
	{
		title: PlaceTitle.ST_SOPHIAS_CATHEDRAL,
		description: `Saint Sophia Cathedral (Ukrainian: Софійський собор) in Kyiv is an architectural monument of Kyivan Rus' and a UNESCO World Heritage site. The cathedral was built in the 11th century and remains one of the most iconic landmarks in the city.

The cathedral features stunning mosaics and frescoes that have survived centuries and still reflect the artistic mastery of the Byzantine era. It was originally built under the rule of Yaroslav the Wise and serves as a testimony to Kyiv's historical significance as a cultural and religious center.`,
		address: "Volodymyrska St, 24",
		thumbnailLink:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/80-391-0151_Kyiv_St.Sophia%27s_Cathedral_RB_18_2_%28cropped%29.jpg/1280px-80-391-0151_Kyiv_St.Sophia%27s_Cathedral_RB_18_2_%28cropped%29.jpg",
		lat: 50.452984,
		lng: 30.514381,
	},
	{
		title: PlaceTitle.ST_MICHAELS_GOLDEN_DOMED_MONASTERY,
		description: `St. Michael's Golden-Domed Monastery (Ukrainian: Михайлівський золотоверхий монастир) is a functioning monastery in Kyiv, known for its brilliant golden domes. It was originally built in the Middle Ages but was destroyed during the Soviet period in the 1930s.

In the late 1990s and early 2000s, the monastery was reconstructed to its former glory. The current structure combines elements of traditional Ukrainian Baroque with modern restoration techniques. Its picturesque location and rich history make it a favorite destination for both tourists and locals.`,
		address: "Triokhsviatytelska St, 8",
		thumbnailLink:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/80-391-9007_Kyiv_St.Michael%27s_Golden-Domed_Monastery_RB_18_%28cropped%29.jpg/1280px-80-391-9007_Kyiv_St.Michael%27s_Golden-Domed_Monastery_RB_18_%28cropped%29.jpg",
		lat: 50.4557276,
		lng: 30.5230178,
	},
	{
		title: PlaceTitle.HOUSE_WITH_CHIMERAS,
		description: `The House with Chimeras (Ukrainian: Будинок з химерами) is an Art Nouveau-style building in Kyiv, famous for its elaborate and unusual decorations featuring animals and mythical creatures. Designed by architect Vladislav Horodetsky in 1902, the building was originally intended as an apartment block.

Its unique facade includes intricate sculptures of elephants, dolphins, frogs, and other figures, showcasing Horodetsky's fascination with exotic wildlife. Today, it serves as the Presidential Administration's reception house and stands as a testament to Kyiv's eclectic architecture.`,
		address: "Bankova St, 10",
		thumbnailLink:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/%D0%91%D1%83%D0%B4%D0%B8%D0%BD%D0%BE%D0%BA_%D1%96%D0%B7_%D1%85%D0%B8%D0%BC%D0%B5%D1%80%D0%B0%D0%BC%D0%B8-3.JPG/1280px-%D0%91%D1%83%D0%B4%D0%B8%D0%BD%D0%BE%D0%BA_%D1%96%D0%B7_%D1%85%D0%B8%D0%BC%D0%B5%D1%80%D0%B0%D0%BC%D0%B8-3.JPG",
		lat: 50.4450683,
		lng: 30.5286211,
	},
	// Mini-sculptures
	{
		title: PlaceTitle.KYIV_TRAM,
		description: `A tribute to Kyiv’s first electric tram, which began operating in 1892 and was the first of its kind in the Russian Empire. The miniature tram sculpture is a reminder of the city's transportation heritage.`,
		address: "Solarity, 1A, Sportyvna Square Gulliver",
		thumbnailLink:
			"https://res2.weblium.site/res/66cd8c1495b35d7bd5eb275f/66de0bb9791e65abbf5964ab_optimized",
		lat: 50.454319,
		lng: 30.524135,
	},
	{
		title: PlaceTitle.KYIV_CHESTNUT,
		description: `The Kyiv Chestnut symbolizes the city's iconic chestnut trees, which have been associated with the Ukrainian capital since the 19th century. Every spring, Kyiv streets are filled with their blossoms, making it a beloved local symbol.`,
		address: "12 Khreshchatyk St",
		thumbnailLink:
			"https://res2.weblium.site/res/66cd8c1495b35d7bd5eb275f/66dca5ed791e65abbf568143_optimized",
		lat: 50.44896,
		lng: 30.518871,
	},
	{
		title: PlaceTitle.GOLDEN_GATE_MINIATURE,
		description: `A small bronze model of Kyiv's Golden Gate (Золоті ворота), one of the medieval city’s key fortifications, originally built in the 11th century. The full-sized gate has been partially reconstructed and remains a historical landmark.`,
		address: "40 Volodymyrska St",
		thumbnailLink:
			"https://res2.weblium.site/res/66cd8c1495b35d7bd5eb275f/66e0a08c280eb75c87c7d85d_optimized",
		lat: 50.44717,
		lng: 30.513458,
	},
	{
		title: PlaceTitle.HEROES,
		description: `This miniature sculpture is dedicated to the heroes who defended Ukraine. It symbolizes courage, resilience, and patriotism, honoring those who fight for the country's independence.`,
		address: "Volodymyrska Hill, Kyiv",
		thumbnailLink:
			"https://res2.weblium.site/res/66cd8c1495b35d7bd5eb275f/66e34a0ed922e488e598235e_optimized",
		lat: 50.4536,
		lng: 30.527,
	},
	{
		title: PlaceTitle.GHOST_OF_KYIV,
		description: `A tribute to the legendary "Ghost of Kyiv," an anonymous Ukrainian fighter pilot rumored to have shot down multiple enemy aircraft during the defense of Kyiv in 2022. The sculpture represents the spirit of resistance and bravery.`,
		address: "Maidan Nezalezhnosti, Kyiv",
		thumbnailLink:
			"https://res2.weblium.site/res/66cd8c1495b35d7bd5eb275f/66e1574d99ca512dad0408db_optimized",
		lat: 50.4501,
		lng: 30.5234,
	},
	{
		title: PlaceTitle.KYIV_ELEPHANT,
		description: `The Kyiv Elephant sculpture is a fun and whimsical representation of an elephant, symbolizing wisdom, strength, and kindness. It serves as a reminder of the animals in Kyiv’s historical zoo and the city's love for nature.`,
		address: "Pechersk District, Kyiv",
		thumbnailLink:
			"https://res2.weblium.site/res/66cd8c1495b35d7bd5eb275f/66ddbe8a791e65abbf589c26_optimized",
		lat: 50.4363,
		lng: 30.553,
	},
	{
		title: PlaceTitle.OPERA_HOUSE,
		description: `The Kyiv Opera House is a stunning architectural masterpiece and a cultural hub in the city. It hosts a variety of performances, including opera, ballet, and concerts, showcasing the rich artistic heritage of Ukraine.`,
		address: "Volodymyrska St, 50",
		thumbnailLink:
			"https://opera.com.ua/sites/default/files/pano1942_45_46_48wide.jpg_fb.jpg",
		lat: 50.44655731933206,
		lng: 30.513056516647342,
	},
	{
		title: PlaceTitle.NATIONAL_MUSEUM_OF_HISTORY,
		description: `The National Museum of History of Ukraine is a major cultural institution that showcases the rich history and heritage of Ukraine. It features a vast collection of artifacts, documents, and exhibits that span from ancient times to the modern era.
The museum is dedicated to preserving and promoting Ukrainian history, culture, and traditions. It plays a crucial role in educating the public about Ukraine's past and its significance in the broader context of European history.`,
		address: "Volodymyrska St, 2",
		thumbnailLink:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/%D0%9D%D0%B0%D1%86%D1%96%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D0%B8%D0%B9_%D0%BC%D1%83%D0%B7%D0%B5%D0%B9_%D1%96%D1%81%D1%82%D0%BE%D1%80%D1%96%D1%97_%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D0%B8%2C_2015_%D1%80..jpg/1920px-%D0%9D%D0%B0%D1%86%D1%96%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D0%B8%D0%B9_%D0%BC%D1%83%D0%B7%D0%B5%D0%B9_%D1%96%D1%81%D1%82%D0%BE%D1%80%D1%96%D1%97_%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D0%B8%2C_2015_%D1%80..jpg",
		lat: 50.45825787340914,
		lng: 30.51630198955536,
	},
	{
		title: PlaceTitle.OLGA_MONUMENT,
		description: `The Monument to Grand Princess Olga of Kyiv is a significant historical monument dedicated to one of the most revered figures in Ukrainian history. Princess Olga, who ruled in the 10th century, is known for her wisdom and leadership.`,
		address: "Volodymyrska St, 24",
		thumbnailLink:
			"https://upload.wikimedia.org/wikipedia/commons/5/5f/%D0%9F%D0%B0%D0%BC%27%D1%8F%D1%82%D0%BD%D0%B8%D0%BA_%D0%BA%D0%BD%D1%8F%D0%B3%D0%B8%D0%BD%D1%96_%D0%9E%D0%BB%D1%8C%D0%B7%D1%96_%28%D0%9A%D0%B8%D1%97%D0%B2%2C_%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D0%B0%29.jpg",
		lat: 50.45540247747665,
		lng: 30.52062571048737,
	},
];

export { places };
