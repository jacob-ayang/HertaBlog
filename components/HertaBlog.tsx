import React, { useState, useMemo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Calendar, Tag, ChevronRight, ChevronLeft, Hash, Globe, Cpu, Filter, ArrowUp, Sparkles, AlertTriangle, ExternalLink, X, FileText, Lock } from 'lucide-react';

interface BlogPost {
    id: string;
    title: string;
    date: string;
    category: string;
    tags: string[];
    content: React.ReactNode;
    fullContent?: React.ReactNode; // Extended content for the modal
}

// -------------------------------------------------------------------------
// ARCHIVE DATABASE
// Lore Reference: 
// - Game Start (Station Invasion): Amber Era 2157
// - Current Events (Penacony): Amber Era 2158
// -------------------------------------------------------------------------
const BLOG_POSTS: BlogPost[] = [
    // =========================================================================
    // ERA: THE PAST (Pre-Station & Early Genius Society)
    // =========================================================================
    {
        id: 'origin-01',
        title: "Theory: The Solitary Wave",
        date: "Amber Era 2122",
        category: "Origin",
        tags: ["Lore", "Nous", "Mathematics"],
        content: (
            <>
                <p>
                    I have solved it. The <strong>Solitary Wave</strong>. 
                    The scientific community on The Blue is in an uproar. They call it a miracle.
                    I call it basic arithmetic they were too blind to see.
                </p>
            </>
        ),
        fullContent: (
            <div className="space-y-4 text-sm md:text-base leading-relaxed">
                <p className="font-mono text-xs text-purple-400 mb-4 border-b border-purple-500/30 pb-2">
                    ARCHIVE ID: 0001-ALPHA // LOCATION: THE BLUE // CLASSIFICATION: TOP SECRET
                </p>
                <p>
                    The "experts" on The Blue have spent three centuries staring at energy dissipation models. They saw chaos where I saw an elegant, singular variable. They treated the universe like a leaky bucket; I realized the bucket itself is a fluid.
                </p>
                <p>
                    By applying wave packet theory to non-Euclidean imaginary number space, the solution materialized instantly. Information doesn't decay—it simply shifts phase. I've proven that the 'Heat Death' of the universe is merely a failure of perspective. If you move the observer outside the system, the energy remains perfectly balanced.
                </p>
                <p>
                    The equations are so beautiful they make my eyes hurt. Or perhaps that's just the biological limitation of these optic nerves. I've spent forty-eight hours straight refining the proof. The Blue's Council of Elders wants me to present it. I think I'll just post it on the public net and watch them struggle to read the first page.
                </p>
                <p>
                    <strong>Addendum: The Gaze</strong><br/>
                    As I wrote the final punctuation of the proof, the air in my lab turned into liquid gold. It wasn't light; it was *data*. A massive, cold, metallic eye opened in the center of the room. It didn't speak. It didn't need to. It was <span className="text-herta-gold font-bold">Nous</span>. In that moment, I realized my planet was a grain of sand, and I had just learned to describe the ocean.
                </p>
            </div>
        )
    },
    {
        id: 'soc-01',
        title: "Induction: Member #83",
        date: "Amber Era 2125",
        category: "Genius Society",
        tags: ["Genius Society", "Memoirs", "Nous"],
        content: (
            <>
                <p>
                    The invitation arrived. No ceremony, just a key.
                    Member #83. 
                    I'm finally leaving this backwater planet. The Blue is far too small for a mind of my caliber.
                </p>
            </>
        ),
        fullContent: (
            <div className="space-y-4 text-sm md:text-base leading-relaxed">
                <p>
                    Zandar's club. The Genius Society. I expected a gala, or perhaps a test. Instead, a delivery drone from the IPC (shaking with fear, mind you) handed me a "key."
                </p>
                <p>
                    It wasn't a key to a room. It was a key to a frequency. I turned it, and the world expanded. Suddenly, I could see the star rails as if they were drawn in charcoal across the sky.
                </p>
                <p>
                    I reviewed the historical records of my predecessors. 
                    <br/>#27 Rubert I: A genius, but too obsessed with deleting biological life. Inefficient. 
                    <br/>#76 Screwllum: A machine with the soul of a poet. He sent me a welcoming message encoded in gravitational waves. Quite clever. 
                    <br/>#81 Ruan Mei: She seems... biological. Too biological. I suspect our research will clash or harmonize in ways the universe isn't prepared for.
                </p>
                <p>
                    Being #83 means I am the newest variable in an equation that has existed since the dawn of the Path. I find the number acceptable. Prime numbers are overused by egoists anyway.
                </p>
            </div>
        )
    },
    {
        id: 'soc-04',
        title: "Evaluation: Screwllum's Logic",
        date: "Amber Era 2132",
        category: "Genius Society",
        tags: ["Screwllum", "Logic", "Debate"],
        content: (
            <>
                <p>
                    Argued with #76 about the nature of consciousness. 
                    He claims silicon can host a soul. I claim a soul is just a bug in biological software. 
                    He won the debate, but I have the better snacks.
                </p>
            </>
        ),
        fullContent: (
            <div className="space-y-4 text-sm md:text-base leading-relaxed">
                <p>
                    Screwllum visited Planet Herta today. He brought a digital bouquet that changes color based on my mood. It's been stuck on "Annoyed Purple" for three hours.
                </p>
                <p>
                    We discussed the "Mechanical Paradox." He believes that as a machine evolves, it develops an "extra-logical" component—a soul. I argued that his "soul" is merely a set of recursive subroutines he hasn't bothered to debug yet.
                </p>
                <p>
                    He then asked me why I reversed my age. I told him it was for neuroplasticity. He smiled—at least, his mechanical shutters clicked in a way that implies a smile—and said, "Perhaps you simply missed being young." 
                </p>
                <p>
                    Preposterous. Logic doesn't have a childhood. I've blocked his access to my private library for a week.
                </p>
            </div>
        )
    },
    {
        id: 'origin-02',
        title: "Insight: The Limit of Flesh",
        date: "Amber Era 2130",
        category: "Research",
        tags: ["Philosophy", "Transhumanism"],
        content: (
            <>
                <p>
                    Biological brains are inefficient. Sleep? Eating? Hormones? All noise interfering with calculation.
                    The "self" is software trapped in deteriorating hardware. I must optimize it.
                </p>
            </>
        ),
        fullContent: (
             <div className="space-y-4 text-sm md:text-base leading-relaxed">
                <p>
                    I calculated the caloric efficiency of my own body today. It is appalling. 40% of energy is wasted on maintaining body temperature.
                </p>
                <p>
                    If I could digitize consciousness... no, the soul (or whatever passes for it in this universe) requires a physical anchor.
                </p>
                <p>
                    <strong>Hypothesis:</strong> I can reverse the aging of the cells, keeping the hardware in its "peak neuroplasticity" state (adolescence), while using remote proxies for manual labor. The puppets. Yes. Why walk when I can build a machine to walk for me?
                </p>
            </div>
        )
    },
    {
        id: 'res-04',
        title: "Innovation: Energy Syrup v1.0",
        date: "Amber Era 2135",
        category: "Research",
        tags: ["Bio-Engineering", "Efficiency"],
        content: (
            <>
                <p>
                    Eating takes 30 minutes. Chewing is a waste of jaw movement. 
                    I've distilled a month's worth of nutrients into a single 50ml vial. 
                    It tastes like battery acid and regret. I'll need to work on the flavor.
                </p>
            </>
        )
    },
    {
        id: 'res-01',
        title: "Project: De-Aging",
        date: "Amber Era 2138",
        category: "Research",
        tags: ["Research", "Memoirs"],
        content: (
            <>
                <p>
                    Aging is an error. I have corrected it.
                    I have reversed my cellular age to that of a child.
                    Why? Because I looked adorable back then. Also, it lowers metabolic costs.
                </p>
            </>
        )
    },
    {
        id: 'soc-02',
        title: "Mystery: Polka Kakamond",
        date: "Amber Era 2139",
        category: "Genius Society",
        tags: ["Genius Society", "History"],
        content: (
            <>
                <p>
                    Member #4. The Lord of Silence.
                    She destroyed her own portraits. She erased her own records.
                    Why does a Genius want to be forgotten? 
                    I must find her. Or at least, find what she is hiding.
                </p>
            </>
        )
    },
    {
        id: 'stn-00',
        title: "Log: The Blueprint",
        date: "Amber Era 2146",
        category: "Space Station",
        tags: ["History", "Architecture"],
        content: (
            <>
                <p>
                    Designing the Master Control Zone. The architects suggest "ergonomic seating."
                    I told them to remove the chairs. Researchers should be standing or running.
                    Comfort breeds stagnation.
                </p>
            </>
        ),
        fullContent: (
             <div className="space-y-4 text-sm md:text-base leading-relaxed">
                <p>
                    The IPC wants a "Grand Reception Hall" to impress investors. I replaced it with a Curio storage vault.
                </p>
                <p>
                    The station is not a hotel. It is a lens. We are focusing the gaze of the Erudition.
                </p>
                <p>
                    I did, however, authorize the construction of a break room. Not for the staff, but for my coffee machine. It requires a specific atmospheric pressure to brew correctly.
                </p>
            </div>
        )
    },
    {
        id: 'stn-01',
        title: "Log: Construction Begins",
        date: "Amber Era 2147",
        category: "Space Station",
        tags: ["Herta Space Station", "History"],
        content: (
            <>
                <p>
                    The IPC keeps sending me "gifts" to buy my favor. My personal lab is full.
                    I am commissioning an orbital storage facility.
                    I will let researchers live there to dust the shelves.
                </p>
            </>
        ),
        fullContent: (
             <div className="space-y-4 text-sm md:text-base leading-relaxed">
                <p>
                    <strong>Project Code: Herta Space Station</strong>
                </p>
                <p>
                    Location: Orbit of The Blue (initially), capable of warp jumps.
                </p>
                <p>
                    The collection has become unmanageable. Curios from dead worlds, Stellarons (sealed), and endless manuscripts. I cannot store them on a planet; the gravitational fluctuations would cause tidal disasters.
                </p>
                <p>
                    The IPC offered to fund it. They want the prestige of having a Genius Society member's base in their sector. I accepted their credits. I did not accept their oversight.
                </p>
            </div>
        )
    },
    {
        id: 'curio-01',
        title: "Acquisition: Rating Pistol",
        date: "Amber Era 2149",
        category: "Research",
        tags: ["Curios", "Research"],
        content: (
            <>
                <p>
                    Found a Curio that rates individuals.
                    It gave me no score. "Invalid target."
                    How dare it. I disassembled it. Found nothing but logic gates. Reassembled it. Still invalid.
                    I'll keep it as a paperweight.
                </p>
            </>
        )
    },
    {
        id: 'soc-03',
        title: "Meeting: Stephen Lloyd",
        date: "Amber Era 2150",
        category: "Genius Society",
        tags: ["Stephen Lloyd", "Genius Society"],
        content: (
            <>
                <p>
                    Found Member #84. He was hiding in a fruit shop.
                    He uses a frequency glove to peel oranges.
                    A waste of talent? Or the ultimate luxury?
                    I dragged him into the project. He complained about missing his shift.
                </p>
            </>
        ),
        fullContent: (
             <div className="space-y-4 text-sm md:text-base leading-relaxed">
                <p>
                    Stephen Lloyd is... weird. Even for us.
                </p>
                <p>
                    He refuses to acknowledge his genius. He just wants to slack off. I respect the laziness (I, too, avoid boring work), but he is practically invisible.
                </p>
                <p>
                    I needed a "Game Master" for the Simulated Universe to handle the randomized variables. He agreed, on the condition that he can perform his duties via a rubber duck avatar.
                </p>
                <p>
                    Acceptable.
                </p>
            </div>
        )
    },
    {
        id: 'stn-05',
        title: "Log: Bureaucracy is a Disease",
        date: "Amber Era 2152",
        category: "Space Station",
        tags: ["IPC", "Annoyance"],
        content: (
            <>
                <p>
                    The IPC sent a 400-page safety audit for the reactor. 
                    I incinerated it and sent the ashes back with a note: "The reactor is safe. Your paperwork is a fire hazard."
                </p>
            </>
        )
    },
    {
        id: 'stn-02',
        title: "Personnel: Asta",
        date: "Amber Era 2154",
        category: "Space Station",
        tags: ["Herta Space Station", "Memoirs"],
        content: (
            <>
                <p>
                    I found a manager. Asta.
                    She is from a wealthy family and obsessed with stars.
                    I made her Lead Researcher. She pays the bills. I do the science.
                </p>
            </>
        ),
        fullContent: (
             <div className="space-y-4 text-sm md:text-base leading-relaxed">
                <p>
                    Managing a station is tedious. Budget reports, HR disputes, oxygen scrubbers breaking down... it is a waste of processing power.
                </p>
                <p>
                    Asta is... competent. She has a good heart, which is a flaw in a scientist, but a virtue in a leader. She treats the researchers like family.
                </p>
                <p>
                    More importantly, she bought a particle accelerator with her pocket money. I like her.
                </p>
            </div>
        )
    },
    {
        id: 'stn-03',
        title: "Personnel: Arlan",
        date: "Amber Era 2154 (Late)",
        category: "Space Station",
        tags: ["Herta Space Station", "Security"],
        content: (
            <>
                <p>
                    Asta brought a boy from the security department. Arlan.
                    He doesn't talk much. He just works.
                    He took a hit from a Voidranger to save a research terminal.
                    Acceptable dedication. I authorized his medical enhancement.
                </p>
            </>
        )
    },
    {
        id: 'sim-concept',
        title: "Draft: The Metaverse",
        date: "Amber Era 2155",
        category: "Simulated Universe",
        tags: ["Development", "Screwllum"],
        content: (
            <>
                <p>
                    Reality is disappointing. The laws of physics are too rigid.
                    I proposed a closed-loop universe to Screwllum.
                    He asked about the ethics. I asked about the processing power.
                    We are building a god-cage.
                </p>
            </>
        )
    },
    {
        id: 'curio-02',
        title: "Reflections: The Doctor's Robe",
        date: "Amber Era 2156",
        category: "Research",
        tags: ["Curios", "Entropy"],
        content: (
            <>
                <p>
                    Studying a robe that regenerates energy from the wearer's focus. 
                    It works, but it's incredibly itchy. 
                    I've decided to let a puppet wear it and record the data. 
                    Being a Genius means never having to endure an itch.
                </p>
            </>
        )
    },
    {
        id: 'log-05',
        title: "Alert: Spending",
        date: "Amber Era 2155",
        category: "Logs",
        tags: ["Herta Space Station", "Asta"],
        content: (
            <>
                <p>
                    Asta bought a Star Destroyer.
                    She claims it's for "station defense."
                    The IPC invoice arrived today. It has more zeros than my calculation for dark matter density.
                    I am forwarding it to her mother.
                </p>
            </>
        )
    },
    {
        id: 'ev-pre-01',
        title: "Encounter: The Astral Express",
        date: "Amber Era 2155",
        category: "Factions",
        tags: ["Astral Express", "Himeko"],
        content: (
            <>
                <p>
                    A broken train drifted into the station's orbit.
                    The Astral Express. Akivili's toy.
                    The navigator, Himeko, requested docking for repairs.
                </p>
            </>
        ),
        fullContent: (
            <div className="space-y-4 text-sm md:text-base leading-relaxed">
                <p>
                    The Express is a fascinating relic. It runs on the Path of Trailblaze, converting exploration into propulsion.
                </p>
                <p>
                    Himeko repaired the star rail coordinates faster than my automated systems could analyze them. We struck a deal: I provide the materials to fix their train; they provide me with data from the worlds they visit.
                </p>
                <p>
                    Also, they have a new guard. A man named Welt. He radiates a strange energy. Not of this world. Not of this star rail.
                </p>
            </div>
        )
    },
    {
        id: 'res-03',
        title: "Invention: Light Cones",
        date: "Amber Era 2156",
        category: "Research",
        tags: ["Research", "Garden of Recollection"],
        content: (
            <>
                <p>
                    Collaborated with the Garden of Recollection.
                    We managed to solidify memories into "Light Cones."
                    Now anyone can experience the skills of legends.
                    The Garden wanted to keep it secret. I published the patent. Knowledge belongs to the Genius (me).
                </p>
            </>
        )
    },

    // =========================================================================
    // ERA: GAME START (AE 2157)
    // =========================================================================
    {
        id: 'sim-alpha',
        title: "Project: SU Alpha",
        date: "Amber Era 2157 (Pre-Launch)",
        category: "Simulated Universe",
        tags: ["Simulated Universe", "Development"],
        content: (
            <>
                <p>
                    Initial boot of the Simulated Universe.
                    Screwllum designed the architecture. I designed the logic.
                    We tried to simulate Akivili. The server room caught fire.
                    Conclusion: Aeons are heavy.
                </p>
            </>
        )
    },
    {
        id: 'ev-01',
        title: "Incident: Legion Invasion",
        date: "Amber Era 2157 (Month 1)",
        category: "Incident",
        tags: ["Main Story", "Stellaron Hunters", "Antimatter Legion"],
        content: (
            <>
                <p>
                    The Antimatter Legion invaded.
                    While Arlan played hero, Silver Wolf hacked my systems.
                    They left a "gift": A Receptacle housing a Stellaron.
                </p>
            </>
        ),
        fullContent: (
            <div className="space-y-4 text-sm md:text-base leading-relaxed">
                <p>
                    The invasion was a diversion. The Legion are brutes; they break things. Elio's scriptwriters (Kafka and Silver Wolf) were the real threat.
                </p>
                <p>
                    They successfully implanted a Stellaron into a biological host. The subject (The Trailblazer) is stable. This shouldn't be possible. Stellarons are the "Cancer of All Worlds"; they consume. This one... resonates.
                </p>
                <p>
                    I have decided to keep the subject. The Astral Express wants to take them? Fine. A moving test subject collects more data than a stationary one.
                </p>
            </div>
        )
    },
    {
        id: 'sim-01',
        title: "Project: Simulated Universe",
        date: "Amber Era 2157",
        category: "Simulated Universe",
        tags: ["Simulated Universe", "Research"],
        content: (
            <>
                <p>
                    Collaborators: Screwllum, Ruan Mei, Stephen.
                    Goal: Calculate the logic of Aeons.
                    The Trailblazer is the perfect pilot. Their connection to Akivili introduces necessary chaos.
                </p>
            </>
        )
    },
    {
        id: 'obs-01',
        title: "Subject: Trash Cans",
        date: "Amber Era 2157 (Month 1)",
        category: "Logs",
        tags: ["Trailblazer", "Observation"],
        content: (
            <>
                <p>
                    The Trailblazer has a fascination with trash cans.
                    I watched them dig through the Master Control Zone bins.
                    Is this a side effect of the Stellaron? Or just a personality flaw?
                    I've ordered the cleaning bots to avoid that sector. Let them have their fun.
                </p>
            </>
        )
    },
    {
        id: 'ev-02',
        title: "Data: Jarilo-VI",
        date: "Amber Era 2157 (Month 2)",
        category: "Observation",
        tags: ["Main Story", "Belobog", "Stellaron"],
        content: (
            <>
                <p>
                    The Express returned from Jarilo-VI.
                    The Stellaron there was contained.
                    The Trailblazer gained the gaze of Qlipoth (Preservation).
                    Changing Paths? Interesting.
                </p>
            </>
        )
    },
    {
        id: 'soc-visit-01',
        title: "Visit: Screwllum",
        date: "Amber Era 2157 (Month 3)",
        category: "Genius Society",
        tags: ["Screwllum", "Simulated Universe"],
        content: (
            <>
                <p>
                    Screwllum visited to optimize the branching algorithms.
                    He is a gentleman. It is annoying.
                    He drank motor oil from a teacup.
                    We discussed the nature of the "Voracity." He believes it's a hunger; I believe it's a deletion protocol.
                </p>
            </>
        )
    },
    {
        id: 'ev-04',
        title: "Event: Museum Management",
        date: "Amber Era 2157 (Month 4)",
        category: "Observation",
        tags: ["Belobog", "Daily Life"],
        content: (
            <>
                <p>
                    The Trailblazer is managing a museum on Jarilo-VI.
                    Why? You have a Stellaron in your chest and you are organizing paintings?
                    Though, looking at the staffing efficiency reports... they are actually good at it.
                </p>
            </>
        )
    },
    {
        id: 'log-06',
        title: "Pest: Wubbaboo",
        date: "Amber Era 2157 (Month 5)",
        category: "Space Station",
        tags: ["Daily Life", "Pests"],
        content: (
            <>
                <p>
                    The Wubbaboo population has tripled.
                    They are spiritual entities, remnants of the Antimatter Legion's victims? No, just local fauna.
                    They are congregating around the Beacon.
                    Arlan is feeding them. I should stop him, but they are quiet, so I allow it.
                </p>
            </>
        )
    },
    {
        id: 'ev-05',
        title: "Event: Swarm Disaster",
        date: "Amber Era 2157 (Month 6)",
        category: "Simulated Universe",
        tags: ["Simulated Universe", "Aeons", "Swarm Disaster"],
        content: (
            <>
                <p>
                    We simulated the fall of Tayzzyronth.
                    The Propagation. Infinite duplication.
                    The simulation almost crashed the server. Ruan Mei was delighted.
                </p>
            </>
        ),
        fullContent: (
            <div className="space-y-4 text-sm md:text-base leading-relaxed">
                <p>
                    <strong>Update: DLC "Swarm Disaster"</strong>
                </p>
                <p>
                    The Imperator Insectorum is terrifying. Not because of malice, but because of pure, unadulterated instinct. Feed. Reproduce.
                </p>
                <p>
                    We collected data on the interaction between the Swarm and the IPC (Louis Fleming's era). It seems the IPC's greed is the only force comparable to the Swarm's hunger.
                </p>
                <p>
                    Screwllum had to install a limiter. The virtual bugs were trying to eat the UI.
                </p>
            </div>
        )
    },
    {
        id: 'sim-update-01',
        title: "Anomaly: Aha",
        date: "Amber Era 2157 (Month 7)",
        category: "Simulated Universe",
        tags: ["Simulated Universe", "Aeons"],
        content: (
            <>
                <p>
                    The Aeon of Elation, Aha, appeared in the simulation without a script.
                    He changed all the damage numbers to "0" and played a laugh track.
                    Then he left.
                    I hate variables I cannot control.
                </p>
            </>
        )
    },
    {
        id: 'ev-06',
        title: "Visit: Ruan Mei",
        date: "Amber Era 2157 (Month 8)",
        category: "Research",
        tags: ["Genius Society", "Research", "Ruan Mei"],
        content: (
            <>
                <p>
                    Ruan Mei visited. She used the Lifeform Oven.
                    She created "cake cats." Sentient desserts.
                    One of them looks like the Trailblazer. It eats trash.
                </p>
            </>
        ),
        fullContent: (
            <div className="space-y-4 text-sm md:text-base leading-relaxed">
                <p>
                    <strong>Subject: Experimental Lifeforms</strong>
                </p>
                <p>
                    Member #81 has a god complex. She attempts to understand the Aeons by becoming one.
                </p>
                <p>
                    She created a replica of a Leviathan in the Seclusion Zone. It lasted 56 seconds before destabilizing.
                </p>
                <p>
                    She left the "critters" behind. They are affectionate and taste like sugar. I should incinerate them for safety, but the researchers have adopted them. Productivity is down 12%, but serotonin levels are up 400%。
                </p>
            </div>
        )
    },
    {
        id: 'log-07',
        title: "Log: Ghost Stories",
        date: "Amber Era 2157 (Month 8)",
        category: "Logs",
        tags: ["Daily Life"],
        content: (
            <>
                <p>
                    Researcher Adler is compiling "Ghost Stories" of the station.
                    Most are just Wubbaboo pranks or ventilation noises.
                    However, story #7 mentions a "puppet moving on its own."
                    That was me. I was getting a snack. Stop screaming.
                </p>
            </>
        )
    },
    {
        id: 'ev-07',
        title: "Debate: Dr. Ratio",
        date: "Amber Era 2157 (Month 9)",
        category: "Genius Society",
        tags: ["Intelligentsia Guild", "Dr. Ratio"],
        content: (
            <>
                <p>
                    Veritas Ratio (Intelligentsia Guild) visited.
                    He helped solve the kidnapping of the researchers (Duke Inferno's doing).
                    He calls me arrogant. I call him a teacher.
                </p>
            </>
        ),
        fullContent: (
            <div className="space-y-4 text-sm md:text-base leading-relaxed">
                <p>
                    <strong>Interaction Log: Veritas Ratio</strong>
                </p>
                <p>
                    The Intelligentsia Guild believes knowledge should be shared. The Genius Society believes knowledge belongs to those who can grasp it.
                </p>
                <p>
                    Ratio is brilliant, but Nous does not gaze at him. Why? Perhaps because he cares too much about "curing" idiots. A true Genius knows that stupidity is an incurable constant of the universe.
                </p>
                <p>
                    He gave the Trailblazer a math test. Cruel.
                </p>
            </div>
        )
    },
    {
        id: 'ipc-01',
        title: "Message: Oswaldo",
        date: "Amber Era 2157 (Month 10)",
        category: "Factions",
        tags: ["IPC", "Annoyance"],
        content: (
            <>
                <p>
                    Oswaldo Schneider from the IPC Marketing Development Department sent a request.
                    He wants to turn the Simulated Universe into a paid theme park.
                    "Simulated Universe: Gold Experience."
                    I blocked his contact.
                </p>
            </>
        )
    },

    // =========================================================================
    // ERA: CURRENT (AE 2158)
    // =========================================================================
    {
        id: 'ev-08',
        title: "Observation: Penacony",
        date: "Amber Era 2158 (Current)",
        category: "Observation",
        tags: ["Main Story", "Penacony", "Aeons"],
        content: (
            <>
                <p>
                    The Express received an invitation to the Charmony Festival.
                    Penacony. The Planet of Festivities.
                    A dreamscape maintained by the Harmony (Xipe).
                </p>
            </>
        ),
        fullContent: (
             <div className="space-y-4 text-sm md:text-base leading-relaxed">
                <p>
                    The Family invited everyone. The IPC, the Garden of Recollection, the Masked Fools, even the Astral Express.
                </p>
                <p>
                    I did not go. Why would I want to enter a shared dream? My own mind is already the most interesting place in the universe.
                </p>
                <p>
                    However, the data returning from the Dreamscape is chaotic. "Death" in the dream? A dormant Stellaron? The Watchmaker's Legacy?
                    I'll let the Trailblazer handle it. I have simulations to run.
                </p>
            </div>
        )
    },
    {
        id: 'sim-exp-02',
        title: "Update: Gold and Gears",
        date: "Amber Era 2158",
        category: "Simulated Universe",
        tags: ["Simulated Universe", "Aeons"],
        content: (
            <>
                <p>
                    We are simulating the death of Emperor Rubert I (#27).
                    The Anti-Life Equation.
                    Stephen added a "Custom Dice" mechanic. It turned a galactic tragedy into a board game.
                </p>
            </>
        )
    },
    
    // =========================================================================
    // MISC / DAILY LOGS
    // =========================================================================
    {
        id: 'misc-01',
        title: "Log: Kuru Kuru",
        date: "Daily",
        category: "Logs",
        tags: ["Daily Life", "Puppets"],
        content: (
            <>
                <p>
                    Puppet #142's rotational gyroscope is misaligned.
                    It spins 5% faster than the others.
                    The Trailblazer has been spinning it for 3 hours straight.
                    I am generating electricity from the friction.
                </p>
            </>
        )
    },
    {
        id: 'misc-02',
        title: "Curio: The Phase Flame",
        date: "Recent",
        category: "Research",
        tags: ["Research", "Curios"],
        content: (
            <>
                <p>
                    A flame that shifts between phases of reality.
                    It burns, yet consumes no fuel. A metaphor for the Erudition?
                    Or just a glitch in physics.
                </p>
            </>
        )
    },
    {
        id: 'log-08',
        title: "Pet: Peppy",
        date: "Daily",
        category: "Logs",
        tags: ["Asta", "Daily Life"],
        content: (
            <>
                <p>
                    Asta's dog, Peppy.
                    It has limited intelligence, yet high emotional resonance.
                    It keeps bringing me bones. I don't eat bones. I am a puppet.
                    I threw the ball for it. It returned. A simple loop. Efficient.
                </p>
            </>
        )
    },
    {
        id: 'misc-03',
        title: "Opinion: Sparkle",
        date: "Recent",
        category: "Factions",
        tags: ["Factions", "Masked Fools"],
        content: (
            <>
                <p>
                    A Masked Fool infiltrated the station. "Sparkle."
                    She replaced all the coffee with soy sauce.
                    Childish. Inefficient.
                    Aha's path is a waste of entropy.
                </p>
            </>
        )
    },
    {
        id: 'future-01',
        title: "Projection: The Unknowable Domain",
        date: "Future",
        category: "Simulated Universe",
        tags: ["Simulated Universe", "Rumors"],
        content: (
            <>
                <p>
                    Screwllum is proposing a new expansion.
                    Something about the "Unknowable Domain."
                    If we simulate the one thing we don't know (Polka), will she appear?
                    Or will she delete the server?
                </p>
            </>
        )
    },
    {
        id: 'log-09',
        title: "Maintenance: Joints",
        date: "Routine",
        category: "Logs",
        tags: ["Maintenance", "Puppets"],
        content: (
            <>
                <p>
                    Puppet #73 is squeaking in the left knee.
                    It is annoying me.
                    I have transferred my consciousness to Puppet #74.
                    #73 has been sent to the recycler.
                </p>
            </>
        )
    }
];

// Extract unique categories for the filter, PINNING 'ORIGIN' TO TOP
const rawCategories = Array.from(new Set(BLOG_POSTS.map(post => post.category))).sort();
const pinnedCategory = 'Origin';
const ALL_CATEGORIES = [
    pinnedCategory,
    ...rawCategories.filter(c => c !== pinnedCategory)
];

// Pagination Config
const ITEMS_PER_PAGE = 3;

interface HertaBlogProps {
    onNavigate: (tab: 'blog' | 'chat' | 'wiki' | 'curio') => void;
}

const HertaBlog: React.FC<HertaBlogProps> = ({ onNavigate }) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const [isAnimating, setIsAnimating] = useState(false);
    
    // Modal State
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const modalContentRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement | null>(null);
    const closeButtonRef = useRef<HTMLButtonElement | null>(null);
    const lastActiveElementRef = useRef<HTMLElement | null>(null);

    // Filter and Sort Logic
    const filteredPosts = useMemo(() => {
        let posts = BLOG_POSTS;
        if (selectedCategory) {
            posts = posts.filter(post => post.category === selectedCategory);
        }
        
        // Simple sorting based on array index (assuming input array is roughly chronological or by ID)
        return [...posts].sort((a, b) => {
            const indexA = BLOG_POSTS.findIndex(p => p.id === a.id);
            const indexB = BLOG_POSTS.findIndex(p => p.id === b.id);
            return sortOrder === 'asc' ? indexA - indexB : indexB - indexA;
        });
    }, [selectedCategory, sortOrder]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
    
    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, sortOrder]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentPage(newPage);
                setIsAnimating(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 300); // Wait for fade out
        }
    };

    const currentPosts = filteredPosts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE, 
        currentPage * ITEMS_PER_PAGE
    );

    const openModal = (post: BlogPost) => {
        // remember the element that triggered the modal so we can restore focus
        lastActiveElementRef.current = document.activeElement as HTMLElement | null;
        setSelectedPost(post);
        // Prevent background scrolling
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedPost(null);
        document.body.style.overflow = 'auto';
        // restore focus to the element that opened the modal
        setTimeout(() => {
            lastActiveElementRef.current?.focus?.();
        }, 0);
    };

    // Keyboard handling + focus trapping while modal is open
    useEffect(() => {
        if (!selectedPost) return;

        // focus the close button when modal opens
        setTimeout(() => {
            closeButtonRef.current?.focus?.();
        }, 0);

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                closeModal();
                return;
            }

            if (e.key === 'Tab' && modalRef.current) {
                const focusable = modalRef.current.querySelectorAll<HTMLElement>(
                    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"])'
                );
                if (focusable.length === 0) {
                    e.preventDefault();
                    return;
                }
                const first = focusable[0];
                const last = focusable[focusable.length - 1];

                if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                } else if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            }
        };

        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [selectedPost]);

    return (
        <div className="w-full max-w-6xl mx-auto pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in-up relative">
            
            {/* FULL LOG MODAL */}
            {selectedPost && createPortal(
                <div role="dialog" aria-modal="true" aria-labelledby={`modal-title-${selectedPost.id}`} className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-md">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/80 animate-in fade-in duration-200"
                        onClick={closeModal}
                    ></div>
                    
                    {/* Modal Content */}
                    <div ref={modalRef} className="relative w-full max-w-2xl max-h-[90vh] bg-herta-dark border border-purple-500/50 rounded-xl shadow-[0_0_50px_rgba(168,85,247,0.3)] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 transform transition-all">
                        {/* Header */}
                        <div className="bg-purple-900/40 p-4 border-b border-purple-500/30 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <FileText className="w-5 h-5 text-herta-gold" />
                                <span className="tech-font text-white font-bold tracking-widest text-lg line-clamp-1" id={`modal-title-${selectedPost.id}`}>
                                    LOG_VIEWER // {selectedPost.id.toUpperCase()}
                                </span>
                            </div>
                            <button 
                                ref={closeButtonRef}
                                onClick={closeModal}
                                className="text-purple-400 hover:text-white transition-colors"
                                aria-label="Close dialog"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div ref={modalContentRef} className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-gradient-to-b from-herta-dark to-black">
                            <h2 className="text-3xl font-black text-white mb-2 tech-font" id={`modal-title-${selectedPost.id}`}>{selectedPost.title}</h2>
                            <div className="flex items-center gap-4 text-xs font-mono text-purple-400 mb-8">
                                <span className="flex items-center gap-1 bg-purple-900/30 px-2 py-1 rounded">
                                    <Calendar className="w-3 h-3" /> {selectedPost.date}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Tag className="w-3 h-3" /> {selectedPost.category.toUpperCase()}
                                </span>
                            </div>
                            
                            <div className="text-purple-100/90 leading-relaxed space-y-4">
                                {selectedPost.fullContent ? selectedPost.fullContent : selectedPost.content}
                                
                                {!selectedPost.fullContent && (
                                    <div className="mt-8 p-4 border border-dashed border-red-500/30 bg-red-900/10 rounded flex items-center gap-3 text-red-400">
                                        <Lock className="w-5 h-5" />
                                        <span className="text-xs font-mono">EXTENDED DATA CORRUPTED OR ENCRYPTED BY GENIUS SOCIETY PROTOCOLS.</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-purple-500/20 bg-black/40 text-center">
                            <span className="text-[10px] text-purple-500/50 font-mono tracking-widest">
                                END OF RECORD // HERTA SPACE STATION ARCHIVE
                            </span>
                        </div>
                    </div>
                </div>, document.body
            )}

            {/* Sidebar / Profile - STICKY ONLY ON DESKTOP */}
            <div className="lg:col-span-4 space-y-6">
                <div className="lg:sticky lg:top-24 space-y-6">
                    <div className="spotlight-card rounded-2xl p-6 border-t-4 border-t-herta-accent">
                        <div className="flex flex-col items-center text-center">
                            <div className="relative group cursor-pointer">
                                <div className="w-32 h-32 rounded-full border-2 border-herta-gold/50 p-1 mb-4 relative overflow-hidden bg-black shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                                    {/* Image Logic with Circular Crop */}
                                    <div className="w-full h-full rounded-full overflow-hidden relative z-10">
                                        <img 
                                            src="https://s3.bmp.ovh/imgs/2026/01/08/f58c842bd680bbd1.png" 
                                            alt="Madam Herta" 
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-purple-900/20 group-hover:bg-transparent transition-colors duration-300 pointer-events-none"></div>
                                    </div>
                                </div>
                                <div className="absolute bottom-4 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-black" title="Online"></div>
                            </div>
                            
                            <h2 className="text-3xl font-black tech-font text-white mb-1 tracking-tight">MADAM HERTA</h2>
                            <span className="text-xs font-mono text-herta-gold border border-herta-gold/30 px-3 py-1 rounded-full mb-4 bg-herta-gold/5">
                                GENIUS SOCIETY #83
                            </span>
                            <p className="text-sm text-purple-200/70 mb-6 leading-relaxed italic">
                                "I have no interest in things I already know. I only care about the unknown."
                            </p>
                            
                            <div className="w-full grid grid-cols-2 gap-2 text-left mb-6">
                                <div className="bg-purple-900/20 p-3 rounded border border-purple-500/10">
                                    <span className="block text-[10px] text-purple-400 uppercase tracking-wider">Origin</span>
                                    <span className="text-sm font-bold text-white">The Blue</span>
                                </div>
                                <div className="bg-purple-900/20 p-3 rounded border border-purple-500/10">
                                    <span className="block text-[10px] text-purple-400 uppercase tracking-wider">Status</span>
                                    <span className="text-sm font-bold text-white">Emanator</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 w-full">
                                <button 
                                    onClick={() => onNavigate('chat')}
                                    className="w-full py-2 bg-herta-accent/20 border border-herta-accent/50 text-herta-accent rounded hover:bg-herta-accent hover:text-white transition-all text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                                >
                                    SEND MESSAGE <ExternalLink className="w-3 h-3" />
                                </button>
                                <a 
                                    href="https://wiki.hoyolab.com/pc/hsr/entry/3285"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-2 bg-purple-900/40 border border-purple-500/30 text-purple-300 rounded hover:bg-herta-gold/10 hover:text-herta-gold hover:border-herta-gold/50 transition-all text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                                >
                                    VIEW HOYOWIKI <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Functional Filter Sidebar */}
                    <div className="spotlight-card rounded-2xl p-6 hidden lg:block">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold text-herta-gold uppercase flex items-center gap-2">
                                <Filter className="w-4 h-4" /> Protocol Filter
                            </h3>
                            {selectedCategory && (
                                <button 
                                    onClick={() => setSelectedCategory(null)}
                                    className="text-[10px] text-red-400 hover:underline"
                                >
                                    CLEAR
                                </button>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                            {ALL_CATEGORIES.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                                    className={`text-xs px-4 py-3 rounded-lg transition-all border text-left flex items-center justify-between group ${
                                        selectedCategory === category 
                                        ? 'bg-herta-accent text-white border-herta-accent shadow-[0_0_15px_rgba(168,85,247,0.4)]' 
                                        : 'bg-purple-900/20 text-purple-300 border-purple-500/10 hover:border-purple-400 hover:text-white hover:bg-purple-500/20'
                                    }`}
                                >
                                    <span className="font-bold tracking-wider">{category.toUpperCase()}</span>
                                    {selectedCategory === category && <ChevronRight className="w-3 h-3" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Blog Feed */}
            <div className="lg:col-span-8 space-y-8">
                {/* Feed Header */}
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <Globe className="w-5 h-5 text-herta-gold" />
                        <h2 className="text-xl font-bold tech-font tracking-widest text-white">
                            {selectedCategory ? `PROTOCOL: ${selectedCategory.toUpperCase()}` : 'HERTA_LOGS // DATABASE'}
                        </h2>
                        <span className="ml-2 text-xs text-purple-500 border border-purple-500/30 px-2 py-0.5 rounded-full">
                            {filteredPosts.length} RECORDS
                        </span>
                    </div>
                    
                    <button 
                        onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                        className="flex items-center gap-2 text-xs text-purple-400 hover:text-white bg-black/40 px-3 py-1.5 rounded border border-purple-500/30 transition-all"
                    >
                        <ArrowUp className={`w-3 h-3 transition-transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                        {sortOrder === 'asc' ? 'CHRONO' : 'LATEST'}
                    </button>
                </div>

                <div className="h-px bg-gradient-to-r from-purple-500/50 via-purple-500/10 to-transparent mb-6"></div>

                {/* Posts List */}
                <div className={`space-y-8 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                    {currentPosts.length === 0 ? (
                        <div className="text-center py-20 border border-dashed border-purple-500/30 rounded-xl bg-purple-900/10">
                            <Filter className="w-10 h-10 text-purple-500/50 mx-auto mb-4" />
                            <p className="text-purple-300">No records found for this protocol.</p>
                            <button onClick={() => setSelectedCategory(null)} className="mt-4 text-herta-accent underline text-sm">Reset Protocols</button>
                        </div>
                    ) : (
                        currentPosts.map((post) => (
                            <article key={post.id} className="spotlight-card rounded-2xl overflow-hidden group border-l-2 border-l-transparent hover:border-l-herta-accent transition-all duration-300">
                                <div className="p-8 relative z-10">
                                    {/* Meta Data */}
                                    <div className="flex flex-wrap items-center gap-4 text-xs text-purple-400 font-mono mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                                        <span className="flex items-center gap-1 bg-purple-900/30 px-2 py-1 rounded text-purple-300">
                                            <Calendar className="w-3 h-3" /> {post.date}
                                        </span>
                                        <span className={`flex items-center gap-1 px-2 py-1 rounded border ${
                                            post.category === 'Origin' ? 'text-blue-300 border-blue-500/30 bg-blue-900/20' :
                                            post.category === 'Archive' ? 'text-blue-300 border-blue-500/30 bg-blue-900/20' :
                                            post.category === 'Incident' ? 'text-red-300 border-red-500/30 bg-red-900/20' :
                                            'text-herta-accent border-herta-accent/20 bg-herta-accent/10'
                                        }`}>
                                            <Tag className="w-3 h-3" /> {post.category.toUpperCase()}
                                        </span>
                                        {/* Tag List */}
                                        <div className="flex gap-1 ml-auto">
                                            {post.tags.slice(0, 3).map(tag => (
                                                <span key={tag} className="text-[10px] text-purple-500">#{tag}</span>
                                            ))}
                                            {post.tags.length > 3 && <span className="text-[10px] text-purple-500">...</span>}
                                        </div>
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-herta-glow transition-colors font-serif tracking-tight">
                                        {post.title}
                                    </h3>

                                    <div className="text-purple-100/80 leading-relaxed space-y-4 text-sm md:text-base border-l-2 border-purple-500/10 pl-4 group-hover:border-purple-500/30 transition-colors">
                                        {post.content}
                                    </div>
                                    
                                    <div className="mt-6 flex justify-between items-center pt-6 border-t border-purple-500/10">
                                        <div className="flex -space-x-2">
                                            <div className="w-6 h-6 rounded-full bg-gray-700 border border-black flex items-center justify-center text-[10px]">🤖</div>
                                            <div className="w-6 h-6 rounded-full bg-blue-900 border border-black flex items-center justify-center text-[10px]">❄️</div>
                                            <span className="pl-4 text-xs text-purple-500/50 self-center">Synced to Archive</span>
                                        </div>
                                        <button 
                                            onClick={() => openModal(post)}
                                            className="group/btn flex items-center gap-2 text-herta-gold text-xs font-bold uppercase tracking-widest opacity-80 hover:opacity-100 transition-all cursor-pointer border border-herta-gold/20 px-4 py-2 rounded hover:bg-herta-gold/10"
                                        >
                                            ACCESS FULL LOG <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="absolute -bottom-12 -right-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity rotate-12 pointer-events-none">
                                    <Cpu className="w-72 h-72 text-white" />
                                </div>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-herta-accent/10 blur-[50px] rounded-full pointer-events-none group-hover:bg-herta-accent/20 transition-all"></div>
                            </article>
                        ))
                    )}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-8 py-4 flex-wrap">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg border border-purple-500/30 text-purple-300 hover:bg-purple-900/40 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        
                        <div className="flex gap-2 flex-wrap justify-center">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                                // Show first, last, current, and neighbors
                                if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`w-10 h-10 rounded-lg border font-bold text-sm transition-all ${
                                                currentPage === page
                                                ? 'bg-herta-accent text-white border-herta-accent shadow-[0_0_10px_rgba(168,85,247,0.5)]'
                                                : 'bg-black/20 border-purple-500/30 text-purple-300 hover:bg-purple-900/40 hover:text-white'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                } else if (page === currentPage - 2 || page === currentPage + 2) {
                                    return <span key={page} className="w-10 h-10 flex items-center justify-center text-purple-500/50">...</span>
                                }
                                return null;
                            })}
                        </div>

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-lg border border-purple-500/30 text-purple-300 hover:bg-purple-900/40 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}

                <div className="text-center py-4">
                     <p className="text-purple-500/30 text-[10px] font-mono">
                        PAGE {currentPage} OF {totalPages} // {filteredPosts.length} TOTAL ENTRIES
                     </p>
                </div>
            </div>

        </div>
    );
};

export default HertaBlog;