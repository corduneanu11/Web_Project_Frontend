import ineleImg from '../components/Images/inele_calisthenics.avif';
import parallettesImg from '../components/Images/Parallettes.avif';
import benziImg from '../components/Images/set_4_benzi_elastice.webp';
import pudraImg from '../components/Images/pudra_proteica.webp';
import creatinaImg from '../components/Images/creatina_monohidrata.webp';

export const equipment = [
  {
    id: "echip-1",
    name: "Inele de Gimnastica (Lemn)",
    price: 150,
    category: "Echipamente Calisthenics",
    image: ineleImg,
    desc: "Perfecte pentru flotari, tractiuni si muscle-ups.",
    fullDesc: "Aceste inele de lemn de inalta calitate ofera un grip excelent si durabilitate pe viata. Fixarea este simpla, cu chingi reglabile rezistente la greutati extreme. Indispensabile pentru cei ce cauta hipertrofie autentica si control."
  },
  {
    id: "echip-2",
    name: "Parallettes / Bari de dips-uri",
    price: 200,
    category: "Echipamente Calisthenics",
    image: parallettesImg,
    desc: "Ideale pentru L-sit, Planche si Handstand.",
    fullDesc: "Construite dintr-un aliaj stabil, parallettes ofera elevatia necesara pentru o raza miscare extinsa. Sunt usoare dar extrem de stabile, perfecte pentru exersarea echilibrelor si miscarilor statice."
  },
  {
    id: "echip-3",
    name: "Benzi Elastice (Set 4 tipuri)",
    price: 100,
    category: "Echipamente Calisthenics",
    image: benziImg,
    desc: "Asistenta excelenta pentru invatarea tractiunilor.",
    fullDesc: "Set de benzi de rezistenta variata: Galben (5kg), Rosu (15kg), Negru (25kg), Mov (35kg). Indispensabile pentru progresia asistata a miscarilor grele precum Muscle-Up si Full Planche."
  }
];

export const supplements = [
  {
    id: "supl-1",
    name: "Pudra Proteica (Whey Isolate)",
    price: 180,
    category: "Suplimente",
    image: pudraImg,
    desc: "Recuperare rapida post-antrenament.",
    fullDesc: "Izolat proteic din zer pur, absorbtie ultra-rapida, fara lactoza adaugata. Ajuta masiv la refacerea musculara dupa antrenamentele pe Calea Masei. Portie de 30g proteine pure per scoop.",
    administration: "Se iau 1-2 cupe (30g-60g) post-antrenament, adaugate in 250ml de apa sau lapte. In zilele de pauza se poate lua o cupa dimineata."
  },
  {
    id: "supl-2",
    name: "Creatina Monohidrata",
    price: 80,
    category: "Suplimente",
    image: creatinaImg,
    desc: "Creste forta exploziva si rezistenta musculara.",
    fullDesc: "Considerat regele suplimentelor de forta. Hidrateaza celula musculara si ajuta regenerarea ATP-ului, ducand la repetari in plus exact in momentul de failure.",
    administration: "Se iau 5g (o lingurita) zilnic, preferabil inainte de antrenament alaturi de carbohidrati sau apa abundenta."
  }
];

export const allProducts = [...equipment, ...supplements];
