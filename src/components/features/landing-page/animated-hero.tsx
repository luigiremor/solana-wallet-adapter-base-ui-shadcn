"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Wallet } from "@/provider/wallet-adapter";
import { DotPattern } from "@/components/features/landing-page/dot-pattern";

export function AnimatedHero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["customizable", "modular", "seamless", "flexible", "powerful"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full bg-background min-h-screen h-full">
      <DotPattern className="[mask-image:radial-gradient(white,transparent)]" />
      <div className="relative container mx-auto px-4">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <Button variant="outline" size="sm" className="gap-2" asChild>
            <a
              href="https://github.com/luigiremor/solana-wallet-adapter-base-ui-shadcn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground"
            >
              <Github className="w-4 h-4 text-foreground" />
              View on GitHub
            </a>
          </Button>
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular text-foreground">
              <span className="text-primary">Solana Wallet Adapter</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold text-foreground"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? { y: 0, opacity: 1 }
                        : { y: titleNumber > index ? -150 : 150, opacity: 0 }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-foreground max-w-2xl text-center">
              Experience the next level of Solana wallet integration with our
              adapter. Simplify your DApp&apos;s UX with modular components and
              effortless styling.
            </p>
          </div>
          <div className="mt-8">
            <Wallet />
          </div>
          <div className="mt-4">
            <Button
              variant="link"
              size="sm"
              className="gap-2 text-primary"
              asChild
            >
              <a
                href="https://github.com/luigiremor/solana-wallet-adapter-base-ui-shadcn#readme"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary"
              >
                Learn more about the features{" "}
                <MoveRight className="w-4 h-4 text-primary" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
