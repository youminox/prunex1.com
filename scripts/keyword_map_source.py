# -*- coding: utf-8 -*-
"""Fuente del mapa de palabras clave de prunex1.com (1 URL = 1 intención). Genera src/data/keyword_map.json.
Formato: (pilar, slug, keyword principal, enfoque/qué cubrir, qué NO cubrir -> ver URL).

ANTI-CANIBALIZACIÓN CON fuxion.site (decisión del propietario): prunex1.com NO publica artículos sobre
estos temas que ya posee fuxion.site:
  - "Prunex1 para qué sirve, cómo tomar y precio" como artículo propio (se trata solo dentro del pilar 'qué es')
  - protocolo / horario nocturno / dosis / fases de Prunex1
  - Prunex1 28 sobres vs Mini 7 sobres: cuántos días tomar
  - Prunex1 en embarazo o lactancia (como tema propio)
  - preparar Prunex1 en agua bien caliente para potenciar el efecto nocturno
  - laxantes químicos irritantes vs fibras de Prunex1
  - estreñimiento por viajes / protocolo de 3 noches
  - aliviar estreñimiento severo en 8 horas
  - artículos genéricos de estreñimiento, hinchazón, gases o colon sin la marca Prunex1
"""
import json, pathlib

A, B, C, D, E, F = ("que-es-prunex1", "precio-prunex1-peru", "ingredientes-prunex1",
                    "como-preparar-prunex1", "opiniones-prunex1", "comparativas-prunex1")

NO_FX = "No escribir protocolos de dosis/horario/días, ni embarazo, ni agua 'bien caliente para potenciar', ni laxantes químicos (temas de fuxion.site)."

PILLARS = [
 (A, "", "qué es Prunex1", "Definición según la etiqueta (bebida instantánea en polvo a base de fibras y extractos vegetales, base de tapioca, sabor guindón), presentación, para qué está pensado según FuXion (beneficios oficiales presentados como 'lo que comunica la marca') y lo que NO promete, sellos, fabricante, registro sanitario en breve. Hub que enlaza a los 14 artículos A.", "No profundizar precio (B), cada ingrediente (C) ni preparación (D). " + NO_FX),
 (B, "", "Prunex1 precio Perú", "Precio de catálogo S/ 76.00 (28 sticks), S/ 2.71 por stick, presentación de 7 sticks S/ 21.00, caja de 7 agotada, puntos, cómo comprar paso a paso en la tienda oficial, envío Lima/provincias en términos generales (el costo se calcula en el checkout), fecha de verificación del precio. Hub de los 12 artículos B.", "No detallar ingredientes ni recetas. No decir cuántos días dura en términos de protocolo."),
 (C, "", "Prunex1 ingredientes", "Lista completa de la etiqueta en orden (16 ingredientes, primero tapioca), función de cada uno, tabla nutricional resumida (18 kcal, 1.7 g fibra, 0 g azúcares añadidos), lo no declarado (cantidades de cada fibra, sorbitol, yodo). Hub de los 20 artículos C.", "No prometer efectos de salud por ingrediente."),
 (D, "", "cómo preparar Prunex1", "Modo de empleo oficial de la etiqueta (1 stick de 5 g en 180 ml de agua caliente, revolver bien, consumir todo), utensilios, video oficial de FuXion, trucos de textura, conservación, resumen y enlaces a variantes. HowTo. Hub de los 18 artículos D.", NO_FX),
 (E, "", "Prunex1 opiniones", "Cómo evaluar opiniones: testimonio verificable vs afirmación comercial; qué comunica FuXion (marcado como comercial), qué dice la etiqueta, preguntas reales; formulario moderado para clientes reales; insignias 'compra verificada'. NO inventar testimonios ni ratings. Hub de los 16 artículos E.", "Sin testimonios inventados ni ratings falsos. " + NO_FX),
 (F, "", "Prunex1 vs otras fibras", "Cómo comparar Prunex1 con otras opciones de fibra y bebidas: criterios (tipo de fibra, gramos por porción, ingredientes, precio por porción, practicidad), tabla resumen y enlaces a las 12 comparativas.", "No comparar con laxantes químicos/estimulantes (tema de fuxion.site). Comparaciones justas, sin denigrar."),
]

ART = [
 # A — Qué es (14)
 (A, "etiqueta-explicada", "etiqueta de Prunex1", "Lectura guiada del empaque frontal y reverso: denominación, sabor, peso neto 140 g, 28 sticks, modo de empleo, ingredientes, advertencias, sellos, lote y vencimiento, fabricante.", "Tabla nutricional en detalle -> C/tabla-nutricional"),
 (A, "es-laxante", "Prunex1 es laxante", "Qué es y qué no es: una bebida con fibras (no un medicamento laxante estimulante según su composición); cómo actúa la fibra que absorbe agua en términos generales; expectativas honestas.", "No comparar con laxantes químicos en detalle (fuxion.site)."),
 (A, "es-un-te", "Prunex1 es un té", "Aclarar el mito: FuXion lo llama 'té herbal', pero la etiqueta lo define como bebida instantánea en polvo a base de fibras y extractos vegetales con tapioca como primer ingrediente; por qué importa al leer la etiqueta.", ""),
 (A, "sabor-y-textura", "Prunex1 sabor", "Sabor guindón con notas de anís y limón, dulzor de estevia y sorbitol, color por carmín, textura algo espesa por psyllium y goma xantán; cómo ajustarla.", "Grumos -> D/sin-grumos"),
 (A, "registro-sanitario", "Prunex1 registro sanitario", "Qué es el registro sanitario en Perú (DIGESA), el código que figura en el empaque vigente (P2963923N NAFXBO, versión 2025 de 7 sticks), dónde verlo, cómo verificar y por qué puede variar por versión.", ""),
 (A, "original-vs-falsificado", "Prunex1 original", "Señales de producto original: doypack sellado, lote y vencimiento, registro, texto exacto de ingredientes, sticks no etiquetados para venta individual (venta suelta = alerta), precio sospechosamente bajo.", "Marketplaces -> B/riesgos-de-comprar-en-marketplaces"),
 (A, "quien-fabrica-prunex1", "quién fabrica Prunex1", "FuXion Biotech S.A.C. (Lurín, Lima; desde 2006; presencia en más de 35 países según la marca), qué es la Fusión Nutracéutica, el rol del distribuidor independiente. Incluir 1 enlace a https://fuxion.site/ como catálogo completo FuXion.", ""),
 (A, "sellos-sin-gluten-no-gmo", "Prunex1 sin gluten", "Qué significan los sellos del empaque: No GMO, sin azúcares, sin gluten, bajo en sodio, Clean Label; qué garantizan y qué no; advertencia de trazas (leche, huevo, soya).", "Alérgenos detallados -> C/alergenos"),
 (A, "para-quien-es", "para quién es Prunex1", "Perfiles a los que FuXion lo orienta (molestias por tránsito lento, dieta pobre en fibra, vida sedentaria) y quién debe evitarlo o consultar (según la ficha oficial: personas con tránsito normal, embarazo/lactancia solo como mención breve, niños, condiciones digestivas).", "Contraindicaciones -> E/contraindicaciones"),
 (A, "fibra-y-transito-intestinal", "Prunex1 tránsito intestinal", "Cómo encaja una bebida con 1.7 g de fibra por porción en el tránsito intestinal, recomendaciones generales de fibra diaria (25–30 g), que no reemplaza una dieta con fibra; agua.", "No hacer guía genérica de estreñimiento (fuxion.site)."),
 (A, "hinchazon-abdominal", "Prunex1 hinchazón", "Lo que comunica FuXion sobre sentirse más liviano, el papel del anís estrella de uso tradicional, por qué la fibra puede dar gases al inicio; expectativas.", "Gases -> E/da-gases"),
 (A, "adelgaza-mitos", "Prunex1 adelgaza", "Desmontar el mito: 18 kcal, no quema grasa; la sensación de 'deshinchar' no es pérdida de grasa; uso responsable.", ""),
 (A, "detox-que-significa", "Prunex1 detox", "Qué significa 'detox' en el marketing (Línea Limpieza y Detox) frente a la fisiología (hígado y riñones); lectura honesta de 'liberarte de desechos'.", ""),
 (A, "prebiotico-y-microbiota", "Prunex1 prebiótico", "La inulina de achicoria como fibra prebiótica, qué es la microbiota, qué dice la evidencia general (EFSA sobre inulina de achicoria a 12 g/día) y que la cantidad por stick no está declarada en la etiqueta peruana.", "Inulina técnica -> C/inulina-de-achicoria"),
 # B — Precio (12)
 (B, "precio-por-stick", "Prunex1 precio por stick", "S/ 76.00 / 28 = S/ 2.71 por stick; 7 sticks S/ 21.00 = S/ 3.00 por stick; comparación con un café o una infusión de cafetería en Lima.", ""),
 (B, "doypack-7-sticks-precio", "Prunex1 7 sticks precio", "Presentación de 7 sticks (doypack, SKU 149138, S/ 21.00) y la caja de 7 agotada (SKU 144137): para quién conviene probar primero, diferencias de etiqueta (35 g).", "No hablar de cuántos días tomar (fuxion.site)."),
 (B, "donde-comprar-original", "dónde comprar Prunex1", "Canal oficial: tienda online FuXion del distribuidor (carlos-lingan.site.fuxion.com/prunex1/); por qué evitar revendedores; cómo es la compra; entrega.", "Provincias -> B/envio-a-provincias"),
 (B, "riesgos-de-comprar-en-marketplaces", "Prunex1 Mercado Libre", "Riesgos en marketplaces y redes: vencidos, mal almacenados (humedad), sticks sueltos, falsificados, sin respaldo; preferir tienda oficial.", "Señales de originalidad -> A/original-vs-falsificado"),
 (B, "farmacias-y-supermercados", "Prunex1 en farmacias", "¿Se vende en farmacias o supermercados? FuXion vende por distribuidores independientes; terceros revendedores en tiendas por departamento/marketplaces no son el canal oficial.", ""),
 (B, "envio-a-provincias", "Prunex1 envío provincias", "Comprar desde Arequipa, Trujillo, Piura, Cusco, Chiclayo, Huancayo, Iquitos vía tienda oficial; el costo y plazo se ven en el checkout (no inventar cifras).", ""),
 (B, "delivery-lima", "Prunex1 delivery Lima", "Entrega en Lima Metropolitana y Callao: cómo pedir, distritos, recibir el pedido y revisar el sello.", ""),
 (B, "formas-de-pago", "comprar Prunex1 con tarjeta", "Medios de pago de la tienda oficial (Visa, Mastercard, American Express, Diners; otros se confirman al pagar), checkout paso a paso, comprobante.", ""),
 (B, "presupuesto-mensual", "Prunex1 cuánto gastar al mes", "Escenarios de gasto mensual según frecuencia de uso (sin recomendar dosis): ejemplos de cálculo con S/ 2.71 por stick.", "No recomendar días ni dosis."),
 (B, "precio-socio-vs-cliente", "Prunex1 precio socio", "Diferencia entre comprar como cliente y registrarse como afiliado/socio FuXion, puntos (10 por doypack de 28), programa de cliente preferente; sin promesas de ingresos.", ""),
 (B, "packs-con-prunex1", "packs FuXion con Prunex1", "Qué packs del catálogo incluyen Prunex1 (Programa Detox 5 Días, packs 5/14) en términos generales, cuándo conviene comprarlo solo; los packs se ven en la tienda oficial.", ""),
 (B, "vale-la-pena", "Prunex1 vale la pena", "Costo-beneficio honesto: qué obtienes por S/ 2.71 (1.7 g de fibra + extractos + practicidad + sabor) vs alternativas caseras; para quién sí y para quién no.", "Comparativas detalladas -> F"),
 # C — Ingredientes (20)
 (C, "psyllium", "psyllium en Prunex1", "Plantago ovata: fibra que absorbe agua y forma gel; evidencia general (declaración EFSA de función intestinal con dosis de varios gramos), cantidad no declarada por stick.", ""),
 (C, "inulina-de-achicoria", "inulina de achicoria en Prunex1", "Qué es la inulina de achicoria, fibra prebiótica, declaración EFSA 2015 (12 g/día), gases al inicio.", "Microbiota -> A/prebiotico-y-microbiota"),
 (C, "guindon", "guindón en Prunex1", "El guindón (ciruela pasa) deshidratado: fibra, sorbitol natural y polifenoles; estudio Attaluri 2011 (guindón vs psyllium, en personas con estreñimiento, con ciruelas enteras) explicado con matices: no es el producto.", ""),
 (C, "anis-estrella", "anís estrella en Prunex1", "Illicium verum: uso tradicional carminativo, aroma; diferencia con anís estrella japonés (tóxico) y control de calidad; incluye aceite esencial de anís.", ""),
 (C, "kelp", "kelp en Prunex1", "Alga kelp: alginatos y minerales, yodo natural no declarado en cantidad; precaución en tiroides.", "Tiroides -> E/tiroides"),
 (C, "mucilago-de-linaza", "mucílago de linaza en Prunex1", "Qué es el mucílago de linaza, fibra viscosa, uso tradicional; diferencia con semilla entera.", "Linaza casera -> F/vs-linaza-casera"),
 (C, "tapioca", "tapioca en Prunex1", "Por qué el primer ingrediente es tapioca: base del polvo, aporta parte de los 4.5 g de carbohidratos; sin gluten.", ""),
 (C, "sorbitol", "sorbitol en Prunex1", "Qué es el sorbitol (poliol), presente en el guindón y como ingrediente; efecto osmótico conocido en dosis altas; cantidad no declarada; tolerancia.", ""),
 (C, "carmin", "carmín en Prunex1", "Color natural carmín (cochinilla, E120): origen animal, seguridad, alergias raras.", "Vegano -> C/es-vegano"),
 (C, "stevia", "stevia en Prunex1", "Glicósidos de esteviol como edulcorante sin calorías; por qué 0 g azúcares añadidos; sabor.", ""),
 (C, "magnesio", "magnesio en Prunex1", "Magnesio como ingrediente (cantidad no declarada en la tabla peruana), rol general del magnesio; prudencia en enfermedad renal.", ""),
 (C, "goma-xantan-y-lecitina", "goma xantán y lecitina en Prunex1", "Aditivos técnicos: goma xantán (espesante) y lecitina de girasol (emulsionante); por qué están y seguridad.", ""),
 (C, "cascara-de-arroz", "cáscara de arroz en Prunex1", "Cáscara de arroz en polvo: qué es, para qué se usa en mezclas en polvo, sin gluten.", ""),
 (C, "limon-y-saborizantes", "saborizantes de Prunex1", "Limón deshidratado y saborizantes (guindón, ciruela, panela): sabor, por qué la panela no suma azúcares añadidos declarados relevantes (0.2 g totales).", ""),
 (C, "tabla-nutricional", "Prunex1 información nutricional", "Tabla completa por 100 ml y por porción de 180 ml con %VD y cómo leerla.", "Calorías -> C/calorias"),
 (C, "calorias", "Prunex1 calorías", "18 kcal por porción (10 kcal/100 ml); comparación con otras bebidas; encaje en dietas.", ""),
 (C, "tiene-azucar", "Prunex1 tiene azúcar", "0.2 g de azúcares totales y 0 g añadidos; sello 'sin azúcares'; sorbitol y estevia; aclarar matices.", ""),
 (C, "alergenos", "Prunex1 alérgenos", "Trazas: elaborado en equipos que procesan leche, huevos y soya; sin gluten; carmín; qué hacer si tienes alergias.", ""),
 (C, "es-vegano", "Prunex1 vegano", "No es estrictamente vegano por el carmín (cochinilla); trazas de lácteos y huevo; opciones para vegetarianos.", ""),
 (C, "fibra-soluble-e-insoluble", "fibra de Prunex1", "Qué tipo de fibra aporta (mayoritariamente soluble: psyllium, inulina, mucílago; la etiqueta antigua mencionaba mix soluble e insoluble), 1.7 g por porción, diferencias soluble vs insoluble.", ""),
 # D — Cómo preparar (18)
 (D, "sin-grumos", "Prunex1 sin grumos", "Técnica para disolver sin grumos: orden polvo/agua, revolver de inmediato, cuchara o batidor pequeño, por qué el psyllium y la goma espesan.", ""),
 (D, "cuanto-es-180-ml", "Prunex1 180 ml", "Cuánto es 180 ml sin medidor (taza estándar, vaso, tazas peruanas típicas), por qué respetar la proporción.", ""),
 (D, "en-avena", "Prunex1 en avena", "Variante no oficial: añadir a avena cocida o remojada; textura; recordar que la etiqueta indica agua caliente.", ""),
 (D, "en-smoothie", "smoothie con Prunex1", "Variante no oficial con frutas peruanas (papaya, plátano, aguaymanto) y agua; consumir de inmediato porque espesa.", ""),
 (D, "con-infusiones", "Prunex1 con manzanilla", "Mezclar con infusiones calientes (manzanilla, hierba luisa, anís) en lugar de agua sola: sabor y precauciones.", ""),
 (D, "con-jugo", "Prunex1 con jugo", "¿Se puede mezclar con jugo de naranja u otras bebidas? azúcar extra, sabor, textura; preferir lo indicado en la etiqueta.", ""),
 (D, "en-ayunas", "Prunex1 en ayunas", "Tomarlo en ayunas: tolerancia gástrica, qué dice la etiqueta (no especifica horario), escucha a tu cuerpo.", "No crear protocolo de horario (fuxion.site)."),
 (D, "rompe-el-ayuno", "Prunex1 rompe el ayuno", "Ayuno intermitente: 18 kcal y 4.5 g de carbohidratos; ayuno estricto vs flexible.", ""),
 (D, "cuanto-tarda-en-hacer-efecto", "Prunex1 cuánto tarda en hacer efecto", "Lo que comunica FuXion (muchas personas notan respuesta a la mañana siguiente; varía) vs lo que depende de cada organismo, hidratación y dieta; cuándo consultar.", "No dar protocolo de días."),
 (D, "cuanta-agua-tomar", "Prunex1 y agua", "Por qué la fibra necesita agua durante el día, cuánta agua en general (sin cifras médicas rígidas), ideas para Lima en verano e invierno.", ""),
 (D, "medicamentos", "Prunex1 y medicamentos", "La fibra puede retrasar la absorción de algunos medicamentos: separar tomas (consenso general de 2 h), consultar al médico o farmacéutico; anticoagulantes, tiroides, diabetes.", ""),
 (D, "conservar-y-vencimiento", "cómo conservar Prunex1", "Lugar fresco y seco, humedad de Lima, cerrar bien el doypack, lote y vencimiento, polvo apelmazado.", ""),
 (D, "dejar-preparado", "Prunex1 preparado con anticipación", "¿Se puede dejar preparado? La etiqueta indica consumir en su totalidad una vez preparado; por qué espesa y se gelifica.", ""),
 (D, "errores-al-prepararlo", "errores al preparar Prunex1", "Poca agua, no revolver, dejarlo reposar mucho, mezclar con mucho azúcar, sticks húmedos, no tomar agua durante el día.", ""),
 (D, "adultos-mayores", "Prunex1 adultos mayores", "Consideraciones para adultos mayores: hidratación, medicamentos, dificultad para tragar bebidas espesas, consultar al médico.", ""),
 (D, "ninos", "Prunex1 niños", "No está pensado para niños; consultar al pediatra; mantener fuera del alcance.", ""),
 (D, "en-la-oficina", "Prunex1 en la oficina", "Llevar sticks al trabajo, preparar con agua del dispensador caliente, discreción, guardar el stick seco.", ""),
 (D, "utensilios-y-taza", "taza para Prunex1", "Qué taza, cuchara o mini batidor usar; tazas térmicas; limpieza por el gel de psyllium.", ""),
 # E — Opiniones y FAQ (16)
 (E, "funciona", "Prunex1 funciona", "Qué esperar realistamente, de qué depende, qué respalda la evidencia de sus ingredientes vs el marketing.", ""),
 (E, "testimonios-vs-afirmaciones-comerciales", "testimonios de Prunex1", "Cómo distinguir testimonio verificable (compra comprobada, experiencia concreta) de afirmación comercial; señales de reseñas falsas; nuestra política de verificación.", ""),
 (E, "preguntas-frecuentes", "Prunex1 preguntas frecuentes", "Las 15–20 dudas más comunes respondidas en breve con enlaces a cada artículo.", ""),
 (E, "da-gases", "Prunex1 gases", "Por qué la fibra (inulina, psyllium) puede dar gases al inicio, la afirmación comercial de FuXion de que no genera gases presentada como comercial, cómo reducirlos.", ""),
 (E, "diarrea", "Prunex1 diarrea", "Por qué podría ablandar demasiado las deposiciones (fibra, sorbitol), qué hacer, cuándo suspender y consultar.", ""),
 (E, "crea-dependencia", "Prunex1 crea dependencia", "La afirmación de FuXion (no es laxante estimulante) y lo que se sabe de la fibra; uso responsable; hábitos.", ""),
 (E, "todos-los-dias", "puedo tomar Prunex1 todos los días", "Uso continuo: lo que dice la etiqueta (no indica límite de días), la ficha oficial (no apto con tránsito normal), escuchar al cuerpo y consultar.", "No dar protocolo."),
 (E, "no-me-hace-efecto", "Prunex1 no me hace efecto", "Razones posibles: poca agua, poca fibra en la dieta, sedentarismo, expectativas; cuándo consultar a un médico (señales de alarma).", ""),
 (E, "dolor-de-barriga", "Prunex1 dolor de estómago", "Cólicos o molestias al empezar: fermentación de la fibra, cómo actuar, señales para suspender.", ""),
 (E, "diabeticos", "Prunex1 diabéticos", "4.5 g de carbohidratos, 0 g azúcares añadidos, estevia y sorbitol; consultar al médico; la fibra y la glucosa en general.", ""),
 (E, "hipertension", "Prunex1 hipertensión", "Sodio 2 mg (bajo en sodio); otros aspectos a considerar (kelp, medicamentos).", ""),
 (E, "tiroides", "Prunex1 tiroides", "El kelp aporta yodo de forma natural (cantidad no declarada); hipotiroidismo/hipertiroidismo y levotiroxina: consultar al endocrinólogo; separar de medicamentos.", ""),
 (E, "gastritis", "Prunex1 gastritis", "Personas con gastritis: bebida caliente, sin cafeína declarada, anís; consultar; tolerancia individual.", ""),
 (E, "colon-irritable", "Prunex1 colon irritable", "Síndrome de intestino irritable: la inulina (FODMAP) y el sorbitol (poliol) pueden empeorar síntomas en algunas personas; psyllium suele tolerarse mejor; consultar.", ""),
 (E, "contraindicaciones", "Prunex1 contraindicaciones", "Quiénes no deberían tomarlo o deben consultar: según la ficha oficial (embarazo, lactancia, tránsito normal), niños, obstrucción intestinal, dificultad para tragar, enfermedad renal, medicación, alergias.", "No hacer artículo de embarazo (fuxion.site); solo mención breve."),
 (E, "efectos-secundarios", "Prunex1 efectos secundarios", "Posibles molestias: gases, hinchazón inicial, heces blandas, alergias; cuándo suspender.", ""),
 # F — Comparativas (12)
 (F, "vs-psyllium-generico", "Prunex1 vs psyllium", "Psyllium puro (cáscara) vs Prunex1: gramos de fibra por porción, sabor, practicidad, precio por porción; tabla.", ""),
 (F, "vs-agua-de-guindones", "Prunex1 vs agua de guindones", "Remedio casero peruano de guindones remojados vs Prunex1: fibra, sorbitol, azúcar natural, practicidad.", ""),
 (F, "vs-metamucil", "Prunex1 vs Metamucil", "Comparación objetiva con un suplemento de psyllium de farmacia: composición, fibra por porción, azúcar/edulcorantes, precio de referencia; sin denigrar.", ""),
 (F, "vs-linaza-casera", "Prunex1 vs linaza", "Linaza remojada/molida casera vs mucílago de linaza en Prunex1; tabla.", ""),
 (F, "vs-chia", "Prunex1 vs chía", "Chía remojada vs Prunex1: fibra por cucharada, calorías, omega-3, practicidad.", ""),
 (F, "vs-probioticos", "Prunex1 vs probióticos", "Prebiótico (inulina) vs probióticos (bacterias vivas, yogur, kéfir): diferencias, complementariedad.", ""),
 (F, "vs-liquid-fiber", "Prunex1 vs Liquid Fiber", "Comparación con otro producto FuXion de fibra (solo diferencias generales y públicas; no inventar datos de Liquid Fiber: si no conoces un dato, dilo); para quién cada uno; Prunex1 como eje.", ""),
 (F, "vs-flora-liv", "Prunex1 vs Flora Liv", "Comparación con el producto FuXion de probióticos (diferencias de enfoque: fibra vs probiótico); sin inventar datos; Prunex1 como eje.", ""),
 (F, "vs-alpha-balance", "Prunex1 vs Alpha Balance", "Comparación con otro producto de la línea Limpieza y Detox de FuXion en términos generales; sin inventar datos; Prunex1 como eje.", ""),
 (F, "vs-bebidas-detox-de-supermercado", "Prunex1 vs bebidas detox", "Jugos verdes y 'tés detox' de supermercado vs Prunex1: azúcar, fibra real, claims.", ""),
 (F, "vs-inulina-pura", "Prunex1 vs inulina", "Inulina en polvo pura vs Prunex1 (mezcla de fibras + extractos); dosis típicas, gases, precio.", ""),
 (F, "vs-fibra-de-avena", "Prunex1 vs avena", "Salvado/avena (beta-glucanos, fibra insoluble) vs Prunex1; complementariedad en el desayuno.", ""),
]

out = []
for p, s, kw, cover, avoid in PILLARS:
    out.append({"slug": p, "pillar": p, "isPillar": True, "primaryKeyword": kw, "cover": cover, "avoid": avoid, "path": f"/{p}/"})
for p, s, kw, cover, avoid in ART:
    out.append({"slug": s, "pillar": p, "isPillar": False, "primaryKeyword": kw, "cover": cover, "avoid": avoid, "path": f"/{p}/{s}/"})

kws = [o["primaryKeyword"].lower() for o in out]
assert len(kws) == len(set(kws)), "keyword duplicada"
slugs = [o["path"] for o in out]
assert len(slugs) == len(set(slugs))
counts = {}
for o in out:
    if not o["isPillar"]:
        counts[o["pillar"]] = counts.get(o["pillar"], 0) + 1
print(len(out), "URLs de contenido", counts, "artículos:", sum(counts.values()))
pathlib.Path(__file__).resolve().parent.parent.joinpath("src/data/keyword_map.json").write_text(json.dumps(out, ensure_ascii=False, indent=1))
