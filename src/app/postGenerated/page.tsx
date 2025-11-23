"use client";

import { useState } from "react";
import { Sparkles, Volume2, Image as ImageIcon } from "lucide-react";
import { usePostStore } from "@/lib/postStore";
import ParticleBackground from "@/components/ParticleBackground";

export default function PostGenerated() {
  const { content, images } = usePostStore();
  const [generatedImages, setGeneratedImages] = useState(false);
  const [contents, setContents] = useState(content);

  return (
    <div className="relative min-h-screen text-white">
      {/* Background */}
      <div className="absolute inset-0 -z-20">
        <ParticleBackground />
      </div>

      {/* Glow Effects */}
      <div className="absolute inset-0 flex justify-center items-start -z-10 pointer-events-none">
        <div
          className="mt-32 w-[700px] h-[700px]
            bg-[radial-gradient(circle_at_40%_40%,rgba(0,200,255,0.30),transparent_60%),
            radial-gradient(circle_at_70%_70%,rgba(170,80,255,0.25),transparent_60%),
            radial-gradient(circle_at_30%_80%,rgba(255,0,230,0.20),transparent_60%)]
            blur-[140px]"
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative flex flex-col max-w-3xl mx-auto pt-16 px-6 pb-24">
        {/* Title */}
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-tr from-cyan-400 via-purple-500 to-cyan-300">
          AI Post Creator
        </h1>

        {/* Section Title */}
        <div className="mt-6 text-xl font-bold flex gap-2 items-center">
          <Sparkles className="text-cyan-400" />
          <span>Generated Content</span>
        </div>

        {/* Content Box */}
        <div className="mt-4 rounded-xl p-6 backdrop-blur-md border border-white/10 bg-white/5 shadow-xl shadow-cyan-500/20">

          {/* Images */}
          {images.length > 0 && (
            <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Generated image ${i}`}
                  className="w-48 h-48 object-cover rounded-xl shadow-lg"
                />
              ))}
            </div>
          )}

          {/* Textarea */}
          <textarea
            value={contents}
            onChange={(e) => setContents(e.target.value)}
            className="text-lg w-full h-64 p-4 rounded-lg resize-none bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {/* --- Bottom Settings Panel (Aligned Correctly) --- */}
        <div className="mt-8 rounded-xl p-6 backdrop-blur-md border border-white/10 bg-white/5 shadow-xl shadow-purple-500/20">

          {/* Toggle */}
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold">Generate Images</span>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={generatedImages}
                onChange={() => setGeneratedImages(!generatedImages)}
                className="sr-only peer"
              />
              <div className="w-12 h-7 bg-white/10 rounded-full peer-checked:bg-cyan-400 transition-all"></div>
              <div className="absolute left-1 top-1 h-5 w-5 bg-white rounded-full transition-all peer-checked:translate-x-5"></div>
            </label>
          </div>

          <p className="text-gray-400 text-sm mt-1">
            Include an AI-generated image with your post
          </p>

          {/* Tone Section */}
          <div className="mt-6 flex items-center gap-3">
            <Volume2 />
            <span className="text-lg font-semibold">Tone</span>
          </div>

          {/* Placeholder buttons or UI */}
          <div className="mt-3 flex gap-3 opacity-40">
            <div className="px-4 py-2 rounded-full bg-white/10 border border-white/10">
              (Tone settings)
            </div>
          </div>

          {/* Content Length */}
          <div className="mt-6 text-lg font-semibold">Content Length</div>

          <div className="mt-3 flex gap-3 opacity-40">
            <div className="px-4 py-2 rounded-full bg-white/10 border border-white/10">
              (Length settings)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
