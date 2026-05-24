"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* =========================================
   COLORS
========================================= */

const COLORS = {
  deepest: "#062130",
  darkest: "#0a3147",
  dark: "#154462",
  medium: "#2c5f88",
  light: "#4a86b1",
  gold: "#c9a84c",

  petalBlue: "rgba(74,134,177,0.2)",
  petalPink: "rgba(212,132,154,0.35)",
  petalGold: "rgba(201,168,76,0.2)",
  petalDarkPink: "rgba(176,80,112,0.25)",

  detailsBg: "rgba(10,49,71,0.35)",
};

/* =========================================
   SVG PATTERN
========================================= */

const PATTERN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cg fill='none' stroke='${encodeURIComponent(
  COLORS.gold
)}' stroke-width='0.6' opacity='0.13'%3E%3Cpolygon points='60,10 85,30 85,70 60,90 35,70 35,30'/%3E%3Cpolygon points='60,25 75,35 75,65 60,75 45,65 45,35'/%3E%3C/g%3E%3C/svg%3E")`;

/* =========================================
   GLOBAL CSS
========================================= */

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Cormorant+Garamond:wght@300;400;500&family=Montserrat:wght@300;400;500;600&display=swap');

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  background: ${COLORS.darkest};
  overflow-x: hidden;
  font-family: 'Montserrat', sans-serif;
}

/* ======================
   BUTTONS
====================== */

.map-btn-grid,
.action-btn-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0,1fr));
  gap: 14px;
  width: 100%;
}

.map-btn,
.action-btn {
  position: relative;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  width: 100%;
  min-height: 56px;

  padding: 14px 18px;

  border-radius: 16px;
  border: 1px solid rgba(201,168,76,0.35);

  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(12px);

  color: #f5dfa0 !important;
  text-decoration: none !important;

  font-size: 13px;
  font-weight: 500;
  letter-spacing: 1px;

  transition: all 0.3s ease;

  box-shadow:
    0 8px 24px rgba(0,0,0,0.18),
    inset 0 1px 0 rgba(255,255,255,0.04);
}

.map-btn:hover,
.action-btn:hover {
  background: rgba(201,168,76,0.12);
  border-color: rgba(201,168,76,0.75);

  transform: translateY(-2px);

  box-shadow:
    0 10px 30px rgba(0,0,0,0.35),
    0 0 22px rgba(201,168,76,0.12);
}

.map-btn:active,
.action-btn:active {
  transform: scale(0.97);
}

/* ======================
   MOBILE
====================== */

@media (max-width: 640px) {

  .map-btn-grid,
  .action-btn-grid {
    grid-template-columns: 1fr;
  }

  .map-btn,
  .action-btn {
    min-height: 54px;
    font-size: 12px;
  }
}

/* ======================
   ANIMATIONS
====================== */

@keyframes shimmer {
  0% {
    background-position: -200% center;
  }

  100% {
    background-position: 200% center;
  }
}

@keyframes petalFall {
  0% {
    transform: translateY(-120px) rotate(0deg);
    opacity: 0;
  }

  15% {
    opacity: 1;
  }

  100% {
    transform:
      translateY(110vh)
      translateX(40px)
      rotate(360deg);

    opacity: 0;
  }
}
`;

/* =========================================
   PETALS
========================================= */

const Petals = () => (
  <div
    style={{
      position: "fixed",
      inset: 0,
      overflow: "hidden",
      pointerEvents: "none",
      zIndex: 1,
    }}
  >
    {Array.from({ length: 16 }).map((_, i) => {
      const colors = [
        COLORS.petalPink,
        COLORS.petalBlue,
        COLORS.petalGold,
        COLORS.petalDarkPink,
      ];

      return (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 6 + (i % 5),
            height: 6 + (i % 5),
            borderRadius: "50% 0 50% 0",
            background: colors[i % colors.length],
            left: `${(i * 6.5) % 100}%`,
            animation: `petalFall ${10 + (i % 5)}s ${
              i * 0.5
            }s linear infinite`,
          }}
        />
      );
    })}
  </div>
);

/* =========================================
   SCRIPT NAME
========================================= */

const ScriptName = ({
  name,
  size = "large",
}: {
  name: string;
  size?: "large" | "medium";
}) => {
  const fs =
    size === "large"
      ? "clamp(58px,12vw,110px)"
      : "clamp(30px,6vw,48px)";

  return (
    <div
      style={{
        fontFamily: '"Pinyon Script", cursive',
        fontSize: fs,
        lineHeight: 1.1,

        background: `linear-gradient(
          90deg,
          ${COLORS.gold} 0%,
          #f5dfa0 40%,
          ${COLORS.gold} 70%,
          #e8c97a 100%
        )`,

        backgroundSize: "200% auto",

        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",

        animation: "shimmer 3.5s linear infinite",
      }}
    >
      {name}
    </div>
  );
};

/* =========================================
   GOLD LINE
========================================= */

const GoldLine = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 14,
      justifyContent: "center",
      margin: "28px auto",
      width: "100%",
    }}
  >
    <div
      style={{
        flex: 1,
        maxWidth: 100,
        height: 1,
        background: `linear-gradient(to right, transparent, ${COLORS.gold})`,
      }}
    />

    <span
      style={{
        color: COLORS.gold,
        fontSize: 13,
      }}
    >
      ✦
    </span>

    <div
      style={{
        flex: 1,
        maxWidth: 100,
        height: 1,
        background: `linear-gradient(to left, transparent, ${COLORS.gold})`,
      }}
    />
  </div>
);

/* =========================================
   CARD
========================================= */

const Card = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    style={{
      minHeight: "100vh",
      position: "relative",
      overflowX: "hidden",

      background: `radial-gradient(
        ellipse at 50% 0%,
        ${COLORS.dark} 0%,
        ${COLORS.darkest} 55%,
        ${COLORS.deepest} 100%
      )`,
    }}
  >
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundImage: PATTERN,
        backgroundSize: "120px 120px",
        pointerEvents: "none",
      }}
    />

    <Petals />

    <div
      style={{
        position: "relative",
        zIndex: 2,

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",

        padding:
          "clamp(60px,10vw,100px) clamp(22px,6vw,80px) clamp(70px,10vw,110px)",
      }}
    >
      {/* Arabic */}
      <div
        style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: "clamp(18px,4vw,28px)",
          color: "#e8c97a",
          letterSpacing: 3,
          marginBottom: 20,
        }}
      >
        بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
      </div>

      {/* Families */}
      <div
        style={{
          fontSize: "clamp(8px,1.6vw,10px)",
          letterSpacing: 6,
          color: "rgba(232,201,122,0.65)",
          textTransform: "uppercase",
          marginBottom: 10,
        }}
      >
        Together with their families
      </div>

      {/* Names */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(12px, 3vw, 28px)",
          flexWrap: "wrap",
        }}
      >
        <ScriptName name="Adil" />

        <div
          style={{
            fontFamily: '"Pinyon Script", cursive',
            fontSize: "clamp(28px,5vw,52px)",
            color: "#d4849a",
          }}
        >
          &
        </div>

        <ScriptName name="Sana" />
      </div>

      {/* IMAGE */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{
          position: "relative",

          width: "clamp(220px,50vw,300px)",
          height: "clamp(300px,70vw,420px)",

          margin: "36px auto 18px",

          padding: "6px",

          borderRadius: "200px 200px 4px 4px",

          border: "1px solid rgba(201,168,76,0.35)",

          background: "rgba(6,33,48,0.2)",

          backdropFilter: "blur(4px)",

          boxShadow: "0 20px 45px rgba(0,0,0,0.35)",

          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            borderRadius: "194px 194px 2px 2px",
            position: "relative",
          }}
        >
          <img
            src="/images/couple.jpg"
            alt="Sana & Adil"
            loading="eager"
            draggable={false}
            style={{
              width: "100%",
              height: "100%",

              objectFit: "cover",
              objectPosition: "center 20%",

              display: "block",

              opacity: 0.92,
              userSelect: "none",
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,

              background: `
                linear-gradient(
                  to bottom,
                  rgba(0,0,0,0.05) 0%,
                  rgba(0,0,0,0.08) 40%,
                  rgba(10,49,71,0.45) 100%
                )
              `,
            }}
          />
        </div>
      </motion.div>

      {/* INVITATION */}
      <div
        style={{
          fontSize: "clamp(8px,1.6vw,10px)",
          letterSpacing: 8,
          color: "rgba(232,201,122,0.45)",
          textTransform: "uppercase",
          marginTop: 14,
        }}
      >
        Wedding Invitation
      </div>

      <GoldLine />

      {/* DETAILS CARD */}
      <div
        style={{
          width: "100%",
          maxWidth: 420,
        }}
      >
        <div
          style={{
            border: "1px solid rgba(201,168,76,0.28)",

            padding: "clamp(24px,5vw,44px)",

            background: COLORS.detailsBg,

            backdropFilter: "blur(8px)",

            borderRadius: 20,
          }}
        >
          <ScriptName name="Adil" size="medium" />

          <div
            style={{
              color: "rgba(232,201,122,0.55)",
              marginTop: 6,
              marginBottom: 18,
              fontSize: 13,
            }}
          >
            Son of Mr. Aziz & Mrs. Soudha
          </div>

          <div
            style={{
              fontFamily: '"Pinyon Script", cursive',
              fontSize: 34,
              color: "#d4849a",
            }}
          >
            &
          </div>

          <ScriptName name="Sana" size="medium" />

          <div
            style={{
              color: "rgba(232,201,122,0.55)",
              marginTop: 6,
              marginBottom: 28,
              fontSize: 13,
            }}
          >
            Daughter of Mr. Musthafa & Mrs. Suhra
          </div>

          <div
            style={{
              height: 1,
              background:
                "linear-gradient(to right, transparent, rgba(201,168,76,0.4), transparent)",
              marginBottom: 24,
            }}
          />

          {/* INFO */}
          <div style={{ color: "#f5dfa0", lineHeight: 2 }}>
            <div>Saturday, 6th June 2026</div>
            <div>12:00 PM Onwards</div>
            <div>Malabar Avenue, Ramanattukara</div>
          </div>

          <div
            style={{
              height: 1,
              background:
                "linear-gradient(to right, transparent, rgba(201,168,76,0.4), transparent)",
              margin: "24px 0",
            }}
          />

          {/* MAP BUTTONS */}
          <div className="map-btn-grid">
            {[
              {
                label: "Open in Maps",
                href: "https://maps.google.com",
                icon: "📍",
              },
              {
                label: "Get Directions",
                href: "https://maps.google.com",
                icon: "🧭",
              },
            ].map((b) => (
              <motion.a
                key={b.label}
                href={b.href}
                target="_blank"
                rel="noreferrer"
                className="map-btn"
                whileTap={{ scale: 0.96 }}
              >
                <span>{b.icon}</span>
                <span>{b.label}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <GoldLine />

      {/* QUOTE */}
      <div
        style={{
          maxWidth: 340,

          fontFamily: '"Cormorant Garamond", serif',
          fontStyle: "italic",

          fontSize: "clamp(14px,2.5vw,17px)",

          color: "rgba(232,201,122,0.65)",

          lineHeight: 2,
          marginBottom: 20,
        }}
      >
        "We joyfully request the honour of your presence
        <br />
        as we begin this blessed journey together."
      </div>

      {/* ACTION BUTTONS */}
      <div
        style={{
          width: "100%",
          maxWidth: 420,
        }}
      >
        <div className="action-btn-grid">
          {[
            {
              icon: "📞",
              label: "Call Family",
              href: "tel:+916282142322",
            },
            {
              icon: "💬",
              label: "WhatsApp",
              href:
                "https://wa.me/916282142322?text=Hi!%20I%20received%20your%20wedding%20invitation.",
            },
          ].map((c) => (
            <motion.a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="action-btn"
              whileTap={{ scale: 0.96 }}
            >
              <span>{c.icon}</span>
              <span>{c.label}</span>
            </motion.a>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div
        style={{
          marginTop: 44,
        }}
      >
        <div
          style={{
            fontFamily: '"Pinyon Script", cursive',
            fontSize: "clamp(26px,5vw,38px)",
            color: "rgba(232,201,122,0.5)",
          }}
        >
          With love & blessings
        </div>

        <div
          style={{
            fontSize: 14,
            color: "rgba(201,168,76,0.3)",
            marginTop: 12,
            letterSpacing: 2,
          }}
        >
          بارَكَ اللَّهُ لَكُمَا وَبارَكَ عَلَيْكُمَا
        </div>
      </div>
    </div>
  </motion.div>
);

/* =========================================
   MAIN COMPONENT
========================================= */

export default function MinimalWeddingCard() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: FONTS }} />

      <AnimatePresence mode="wait">
        {!open ? (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(true)}
            style={{
              position: "fixed",
              inset: 0,

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              cursor: "pointer",

              background: `radial-gradient(
                ellipse at center,
                ${COLORS.dark} 0%,
                ${COLORS.darkest} 60%,
                ${COLORS.deepest} 100%
              )`,
            }}
          >
            <div
              style={{
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: '"Pinyon Script", cursive',
                  fontSize: "clamp(52px,12vw,100px)",
                  color: "#f5dfa0",
                }}
              >
                Adil & Sana
              </div>

              <div
                style={{
                  marginTop: 12,

                  color: "rgba(232,201,122,0.7)",

                  letterSpacing: 5,
                  textTransform: "uppercase",

                  fontSize: 12,
                }}
              >
                Tap to Open Invitation
              </div>
            </div>
          </motion.div>
        ) : (
          <Card key="card" />
        )}
      </AnimatePresence>
    </>
  );
}