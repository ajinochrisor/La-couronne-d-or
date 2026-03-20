export const RESTAURANT_NAME = "La Couronne d'Or";
export const RESTAURANT_TAGLINE = "Festin Royal & Noblesse de Table";

export const MENU = [
  // ENTRÉES
  { id:1,  name:"Tartare de Bœuf Royal",      category:"Entrée",   price:18, desc:"Bœuf haché, câpres, cornichons, sauce moutarde ancienne", image:"https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&q=80", daily:true },
  { id:2,  name:"Soupe à l'Oignon Gratinée",  category:"Entrée",   price:12, desc:"Bouillon de bœuf, oignons confits, gruyère fondu",        image:"https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80", daily:false },
  { id:3,  name:"Carpaccio de Saumon",         category:"Entrée",   price:15, desc:"Saumon fumé, aneth frais, câpres, citron confit",         image:"https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80", daily:true },
  { id:4,  name:"Foie Gras Poêlé",            category:"Entrée",   price:24, desc:"Foie gras de canard, pain brioché, compotée de figues",   image:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80", daily:true },
  { id:5,  name:"Velouté de Homard",           category:"Entrée",   price:22, desc:"Bisque de homard, crème fraîche, huile de truffe",        image:"https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&q=80", daily:false },
  { id:6,  name:"Œufs Mimosa à la Truffe",    category:"Entrée",   price:16, desc:"Œufs durs, mayonnaise maison, copeaux de truffe noire",   image:"https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&q=80", daily:false },

  // PLATS
  { id:7,  name:"Côte de Bœuf Royale",        category:"Plat",     price:42, desc:"900g, sauce béarnaise, frites maison, légumes de saison", image:"https://images.unsplash.com/photo-1558030006-450675393462?w=400&q=80", daily:true },
  { id:8,  name:"Filet de Sole Meunière",      category:"Plat",     price:30, desc:"Sole fraîche, beurre citronné, câpres, légumes vapeur",   image:"https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80", daily:false },
  { id:9,  name:"Magret de Canard aux Figues", category:"Plat",     price:34, desc:"Magret rosé, sauce figues & porto, pommes Dauphinoises",  image:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80", daily:true },
  { id:10, name:"Risotto Truffe & Parmesan",   category:"Plat",     price:26, desc:"Riz Arborio, champignons des bois, truffe noire",         image:"https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&q=80", daily:false },
  { id:22, name:"Rack d'Agneau Persillé",      category:"Plat",     price:38, desc:"Carré d'agneau en croûte d'herbes, gratin dauphinois",    image:"https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80", daily:true },
  { id:23, name:"Homard Thermidor",            category:"Plat",     price:58, desc:"Homard breton, sauce crème cognac, gratin de gruyère",    image:"https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&q=80", daily:false },

  // DESSERTS
  { id:11, name:"Crème Brûlée Vanille",        category:"Dessert",  price:10, desc:"Vanille de Madagascar, caramel croquant, fruits rouges",  image:"https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80", daily:true },
  { id:12, name:"Fondant Chocolat Noir",        category:"Dessert",  price:11, desc:"Chocolat Valrhona 72%, cœur coulant, glace vanille",     image:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80", daily:true },
  { id:13, name:"Tarte Tatin Caramel",          category:"Dessert",  price:9,  desc:"Pommes Golden caramélisées, crème fraîche",              image:"https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&q=80", daily:false },
  { id:14, name:"Soufflé Grand Marnier",        category:"Dessert",  price:14, desc:"Soufflé léger, zestes d'orange confits",                 image:"https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80", daily:false },
  { id:15, name:"Mille-Feuille Royale",         category:"Dessert",  price:12, desc:"Feuilletage croustillant, crème pâtissière vanille",     image:"https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=400&q=80", daily:true },
  { id:16, name:"Île Flottante aux Pralines",   category:"Dessert",  price:9,  desc:"Blancs en neige, crème anglaise, pralines roses",        image:"https://images.unsplash.com/photo-1488477304112-4944851de03d?w=400&q=80", daily:false },

  // VINS — images locales
  { id:17, name:"Château Margaux 2018",         category:"Vin Rouge",  price:85,  desc:"Grand cru Bordeaux, tanins soyeux, cerise noire & cèdre", image:"/drinks/margaux.png",        daily:false, isBottle:true },
  { id:18, name:"Sancerre Blanc 2021",          category:"Vin Blanc",  price:48,  desc:"Loire, sauvignon, minéral & frais, notes d'agrumes",      image:"/drinks/sancerre.png",       daily:false, isBottle:true },
  { id:28, name:"Côtes de Provence Rosé",       category:"Vin Rosé",   price:38,  desc:"Pâle et délicat, framboise et fleurs blanches",           image:"/drinks/provence-rose.png",  daily:false, isBottle:true },

  // CHAMPAGNES — images locales
  { id:19, name:"Dom Pérignon 2013",            category:"Champagne",  price:220, desc:"Prestige cuvée, bulles fines, brioche & fruits blancs",   image:"/drinks/dom-perignon.png",   daily:false, isBottle:true },
  { id:20, name:"Moët & Chandon Brut Imperial", category:"Champagne",  price:75,  desc:"Bulles élégantes, fraîcheur florale et vivacité",         image:"/drinks/moet.png",           daily:false, isBottle:true },
  { id:29, name:"Veuve Clicquot Rosé",          category:"Champagne",  price:95,  desc:"Cuvée rosé emblématique, rondeur & fruits rouges",        image:"/drinks/veuve-clicquot.png", daily:false, isBottle:true },

  // COCKTAILS — images locales
  { id:21, name:"Royal Spritz",                 category:"Cocktail",   price:14,  desc:"Aperol, prosecco, eau pétillante, tranche d'orange",      image:"/drinks/royal-spritz.png",   daily:false },
  { id:24, name:"King's Mojito",                category:"Cocktail",   price:13,  desc:"Rhum blanc, menthe fraîche, citron vert, ginger beer",    image:"/drinks/kings-mojito.png",   daily:false },
  { id:30, name:"Negroni Royale",               category:"Cocktail",   price:15,  desc:"Gin premium, Campari, vermouth rouge, zeste flambé",      image:"/drinks/negroni.png",        daily:false },
  { id:31, name:"Kir Royal Signature",          category:"Cocktail",   price:12,  desc:"Crème de cassis de Dijon, champagne brut, myrtilles",     image:"/drinks/kir-royal.png",      daily:false },

  // SOFTS — images locales
  { id:25, name:"Jus de Fruits Frais",          category:"Jus",        price:7,   desc:"Orange, pomme, ananas ou mangue — pressé à la commande", image:"/drinks/jus-fruits.png",     daily:true },
  { id:26, name:"Eau Minérale",                 category:"Eau",        price:5,   desc:"Évian plate ou Perrier pétillante — 75cl",                image:"/drinks/eau.png",            daily:true },
  { id:27, name:"Café Royale",                  category:"Café",       price:5,   desc:"Expresso double, grains d'exception, mignardises",        image:"/drinks/cafe.png",           daily:true },
];

export const TABLES = [
  { id:1, capacity:2 },{ id:2, capacity:4 },{ id:3, capacity:4 },
  { id:4, capacity:6 },{ id:5, capacity:2 },{ id:6, capacity:4 },
  { id:7, capacity:8 },{ id:8, capacity:2 },{ id:9, capacity:4 },
  { id:10, capacity:6 },
];

export const EMPLOYEES = [
  { id:1, name:"Marie Dupont",    role:"Cheffe de rang",  color:"#3b7dd8", bg:"rgba(59,125,216,.18)",  initials:"MD" },
  { id:2, name:"Thomas Lefebvre", role:"Serveur",         color:"#c8a832", bg:"rgba(200,168,50,.18)",  initials:"TL" },
  { id:3, name:"Sophie Martin",   role:"Maître d'hôtel",  color:"#d4a843", bg:"rgba(212,168,67,.18)",  initials:"SM" },
  { id:4, name:"Lucas Bernard",   role:"Serveur",         color:"#2a7ab5", bg:"rgba(42,122,181,.18)",  initials:"LB" },
];

export const initReservations = [
  { id:1, client:"Famille Moreau", time:"19h30", covers:4, table:2, status:"confirmed", phone:"06 12 34 56 78" },
  { id:2, client:"M. Petit",       time:"20h00", covers:2, table:5, status:"confirmed", phone:"06 98 76 54 32" },
  { id:3, client:"Groupe Leroy",   time:"20h30", covers:8, table:7, status:"pending",   phone:"07 11 22 33 44" },
];

export const initAssignments = { 2:1, 4:3, 5:2 };

export const initOrders = [
  { id:1, tableId:2, clientName:"Famille Moreau",   employeeId:1, items:[1,7,7,11,12,17], status:"in-progress", time:"19h45" },
  { id:2, tableId:5, clientName:"M. Petit",         employeeId:2, items:[3,9,20,11],      status:"served",      time:"20h10" },
  { id:3, tableId:4, clientName:"Entreprise Duval", employeeId:3, items:[4,5,10,19,12,13],status:"in-progress", time:"19h30" },
];

export const initReviews = [
  { id:1, client:"Sophie L.",    date:"20/03/2026", food:5, service:5, ambiance:4, comment:"Une expérience gastronomique exceptionnelle ! Le foie gras était divin et la côte de bœuf parfaitement cuite.", dish:"Foie Gras & Côte de Bœuf Royale" },
  { id:2, client:"Jean-Marc D.", date:"19/03/2026", food:4, service:5, ambiance:5, comment:"Cadre somptueux, service aux petits soins. Le homard Thermidor était à couper le souffle.", dish:"Homard Thermidor" },
  { id:3, client:"Isabelle R.",  date:"18/03/2026", food:5, service:4, ambiance:5, comment:"Le mille-feuille royal est une pure merveille. L'atmosphère royale est sans pareil.", dish:"Mille-Feuille Royale" },
  { id:4, name:"Pierre T.",      date:"17/03/2026", food:4, service:4, ambiance:4, comment:"Très bonne cuisine, le risotto truffe était savoureux. Le Dom Pérignon parfait.", dish:"Risotto Truffe & Parmesan" },
];
