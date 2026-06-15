path = '/Users/alexanderhidveghy/Documents/cms/viktorija/src/app/academia/(kurzy)/laser-touch/page.tsx'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. New Section 1 Block
old_section1 = """            {/* Section 1: Photo + Intro */}
            <PhotoSection photo="/academia/kurz6/lasertouch%20main.PNG" flip={false}>
                <div className="space-y-4 font-montserrat font-light text-[#1D0E22] leading-tight text-lg [&_p]:my-0">
                    <p className="font-montserrat text-lg font-light text-[#1D0E22] leading-snug mb-2">
                        Odstraňovanie nežiaduceho permanentného make-upu ND:YAG Q-Switch laserom
                    </p>
                    <p>
                        Laserovému odstraňovaniu permanentného make-upu sa venujem od roku 2014.
                        Aj ja sama som absolvovala individuálne školenia u dvoch špecialistov, ktorí patrili medzi priekopníkov laserového odstraňovania pigmentov. Jeden z nich sa dokonca podieľal na vývoji Q-Switch technológie.
                    </p>
                    <p>
                        Dlhoročná prax v permanentnom make-upe mi umožňuje rozumieť pigmentu nielen z pohľadu lasera, ale aj z pohľadu jeho správania v pokožke, hĺbky uloženia, hojenia a reakcie organizmu počas rokov.
                    </p>
                    <p>
                        Kurz je určený pre špecialistov, ktorí chcú bezpečne a profesionálne pracovať s laserovým odstraňovaním permanentného make-upu a malých tetovaní.
                    </p>
                    <p className="pt-2">
                        Výučba prebieha individuálne a pozostáva z dvoch častí.
                    </p>
                </div>
            </PhotoSection>"""

new_section1 = """            {/* Section 1: Photo + Intro */}
            <PhotoSection photo="/academia/kurz6/lasertouch%20main.PNG" flip={false}>
                <div className="space-y-6">
                    <div className="space-y-4 font-montserrat font-light text-[#1D0E22] leading-tight text-lg [&_p]:my-0">
                        <p className="font-montserrat text-lg font-light text-[#1D0E22] leading-snug mb-2">
                            Odstraňovanie nežiaduceho permanentného make-upu ND:YAG Q-Switch laserom
                        </p>
                        <p>
                            Laserovému odstraňovaniu permanentného make-upu sa venujem od roku 2014.
                            Aj ja sama som absolvovala individuálne školenia u dvoch špecialistov, ktorí patrili medzi priekopníkov laserového odstraňovania pigmentov. Jeden z nich sa dokonca podieľal na vývoji Q-Switch technológie.
                        </p>
                        <p>
                            Dlhoročná prax v permanentnom make-upe mi umožňuje rozumieť pigmentu nielen z pohľadu lasera, ale aj z pohľadu jeho správania v pokožke, hĺbky uloženia, hojenia a reakcie organizmu počas rokov.
                        </p>
                        <p>
                            Kurz je určený pre špecialistov, ktorí chcú bezpečne a profesionálne pracovať s laserovým odstraňovaním permanentného make-upu a malých tetovaní.
                        </p>
                        <p className="pt-2">
                            Výučba prebieha individuálne a pozostáva z dvoch častí.
                        </p>
                    </div>

                    <div className="space-y-6 pt-6 border-t border-[#1D0E22]/10">
                        <div>
                            <h2 className="font-marcellus text-xl md:text-2xl uppercase tracking-widest text-[#1D0E22]">1. časť</h2>
                            <p className="font-montserrat text-sm text-[#1D0E22]/60 mt-1">Teória a ukážky procedúr</p>
                        </div>
                        <div className="space-y-4 font-montserrat font-light text-[#1D0E22] leading-tight text-lg [&_p]:my-0">
                            <p>
                                Prvé stretnutie prebieha v mojom štúdiu formou teoretickej výučby a praktických ukážok.
                            </p>
                            <p className="font-medium text-base uppercase tracking-wider">Budeme sa venovať:</p>
                            <ul className="space-y-1.5 text-sm text-[#1D0E22]/80">
                                <li className="flex gap-2"><span className="text-[#1D0E22]/25 shrink-0">—</span><span>technickým možnostiam ND:YAG Q-Switch lasera</span></li>
                                <li className="flex gap-2"><span className="text-[#1D0E22]/25 shrink-0">—</span><span>správnemu nastavovaniu a kalibrácii impulzov</span></li>
                                <li className="flex gap-2"><span className="text-[#1D0E22]/25 shrink-0">—</span><span>komunikácii medzi laserom, pokožkou a pigmentom</span></li>
                                <li className="flex gap-2"><span className="text-[#1D0E22]/25 shrink-0">—</span><span>odtieňom pigmentov, ktoré laser vidí a ktoré reagujú odlišne</span></li>
                                <li className="flex gap-2"><span className="text-[#1D0E22]/25 shrink-0">—</span><span>biologickým procesom v pokožke počas procedúry</span></li>
                                <li className="flex gap-2"><span className="text-[#1D0E22]/25 shrink-0">—</span><span>fungovaniu lymfatického systému pri odvádzaní pigmentu</span></li>
                                <li className="flex gap-2"><span className="text-[#1D0E22]/25 shrink-0">—</span><span>životu pigmentu v pokožke a pôsobeniu organizmu na jeho zmeny</span></li>
                                <li className="flex gap-2"><span className="text-[#1D0E22]/25 shrink-0">—</span><span>bezpečnosti práce a ochrane integrity pokožky</span></li>
                                <li className="flex gap-2"><span className="text-[#1D0E22]/25 shrink-0">—</span><span>situáciám, v ktorých môžeme bezpečne zvýšiť intenzitu laserového lúča</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </PhotoSection>"""

# 2. New Section 2 Block
old_section2 = """            {/* Section 2: Photo + 1. časť — teória */}
            <PhotoSection photo="/academia/kurz6/photo_2025-03-17_13-31-34.jpg" flip={true}>
                <div className="space-y-6">
                    <div>
                        <h2 className="font-marcellus text-xl md:text-2xl uppercase tracking-widest text-[#1D0E22]">1. časť</h2>
                        <p className="font-montserrat text-sm text-[#1D0E22]/60 mt-1">Teória a ukážky procedúr</p>
                    </div>
                    <div className="space-y-4 font-montserrat font-light text-[#1D0E22] leading-tight text-lg [&_p]:my-0">
                        <p>
                            Prvé stretnutie prebieha v mojom štúdiu formou teoretickej výučby a praktických ukážok.
                        </p>
                        <p className="font-medium text-base uppercase tracking-wider">Budeme sa venovať:</p>
                        <ul className="space-y-1.5 text-sm text-[#1D0E22]/80">
                            <li className="flex gap-2"><span className="text-[#1D0E22]/25 shrink-0">—</span><span>technickým možnostiam ND:YAG Q-Switch lasera</span></li>
                            <li className="flex gap-2"><span className="text-[#1D0E22]/25 shrink-0">—</span><span>správnemu nastavovaniu a kalibrácii impulzov</span></li>
                            <li className="flex gap-2"><span className="text-[#1D0E22]/25 shrink-0">—</span><span>komunikácii medzi laserom, pokožkou a pigmentom</span></li>
                            <li className="flex gap-2"><span className="text-[#1D0E22]/25 shrink-0">—</span><span>odtieňom pigmentov, ktoré laser vidí a ktoré reagujú odlišne</span></li>
                            <li className="flex gap-2"><span className="text-[#1D0E22]/25 shrink-0">—</span><span>biologickým procesom v pokožke počas procedúry</span></li>
                            <li className="flex gap-2"><span className="text-[#1D0E22]/25 shrink-0">—</span><span>fungovaniu lymfatického systému pri odvádzaní pigmentu</span></li>
                            <li className="flex gap-2"><span className="text-[#1D0E22]/25 shrink-0">—</span><span>životu pigmentu v pokožke a pôsobeniu organizmu na jeho zmeny</span></li>
                            <li className="flex gap-2"><span className="text-[#1D0E22]/25 shrink-0">—</span><span>bezpečnosti práce a ochrane integrity pokožky</span></li>
                            <li className="flex gap-2"><span className="text-[#1D0E22]/25 shrink-0">—</span><span>situáciám, v ktorých môžeme bezpečne zvýšiť intenzitu laserového lúča</span></li>
                        </ul>
                        <p className="font-medium text-base uppercase tracking-wider pt-2">Učíme sa pracovať s:</p>
                        <ul className="space-y-1.5 text-sm text-[#1D0E22]/80">
                            <li className="flex gap-2"><span className="text-[#1D0E22]/25 shrink-0">—</span><span>obočím</span></li>
                            <li className="flex gap-2"><span className="text-[#1D0E22]/25 shrink-0">—</span><span>perami</span></li>
                            <li className="flex gap-2"><span className="text-[#1D0E22]/25 shrink-0">—</span><span>očnými linkami</span></li>
                            <li className="flex gap-2"><span className="text-[#1D0E22]/25 shrink-0">—</span><span>malými tetovaniami</span></li>
                        </ul>
                        <p className="pt-2">
                            Súčasťou školenia je aj systém výpočtu predpokladaného počtu procedúr pomocou špecializovaných tabuliek, aby ste vedeli klientov správne informovať ešte pred začiatkom procesu.
                        </p>
                        <div className="border-l-2 border-gold/40 pl-4 italic text-[#1D0E22]/80 pt-2">
                            <p>Laserové odstránenie patrí medzi najrýchlejšie a najbezpečnejšie metódy odstránenia pigmentu z tela bez narušenia integrity pokožky.</p>
                        </div>
                    </div>
                </div>
            </PhotoSection>"""

new_section2 = """            {/* Section 2: Photo + Učíme sa pracovať s & Súčasťou školenia */}
            <PhotoSection photo="/academia/kurz6/photo_2025-03-17_13-31-34.jpg" flip={true}>
                <div className="space-y-6 font-montserrat font-light text-[#1D0E22] leading-tight text-lg [&_p]:my-0">
                    <p className="font-medium text-base uppercase tracking-wider">Učíme sa pracovať s:</p>
                    <ul className="space-y-1.5 text-sm text-[#1D0E22]/80">
                        <li className="flex gap-2"><span className="text-[#1D0E22]/25 shrink-0">—</span><span>obočím</span></li>
                        <li className="flex gap-2"><span className="text-[#1D0E22]/25 shrink-0">—</span><span>perami</span></li>
                        <li className="flex gap-2"><span className="text-[#1D0E22]/25 shrink-0">—</span><span>očnými linkami</span></li>
                        <li className="flex gap-2"><span className="text-[#1D0E22]/25 shrink-0">—</span><span>malými tetovaniami</span></li>
                    </ul>
                    <p className="pt-4">
                        Súčasťou školenia je aj systém výpočtu predpokladaného počtu procedúr pomocou špecializovaných tabuliek, aby ste vedeli klientov správne informovať ešte pred začiatkom procesu.
                    </p>
                    <div className="border-l-2 border-gold/40 pl-4 italic text-[#1D0E22]/80 pt-2">
                        <p>Laserové odstránenie patrí medzi najrýchlejšie a najbezpečnejšie metódy odstránenia pigmentu z tela bez narušenia integrity pokožky.</p>
                    </div>
                </div>
            </PhotoSection>"""

content_normalized = content.replace("\r\n", "\n")
old_section1_normalized = old_section1.replace("\r\n", "\n")
old_section2_normalized = old_section2.replace("\r\n", "\n")

if old_section1_normalized in content_normalized:
    content_normalized = content_normalized.replace(old_section1_normalized, new_section1)
    print("Replacement 1: SUCCESS")
else:
    print("Replacement 1: FAILED")

if old_section2_normalized in content_normalized:
    content_normalized = content_normalized.replace(old_section2_normalized, new_section2)
    print("Replacement 2: SUCCESS")
else:
    print("Replacement 2: FAILED")

with open(path, 'w', encoding='utf-8') as f:
    f.write(content_normalized)
print("Finished writing.")
