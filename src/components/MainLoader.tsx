type MainLoaderProps = {
  title: string;
  words: string[];
};

export function MainLoader({ title, words }: MainLoaderProps) {
  return (
    <div className="loaderMain">
      <p>{title}</p>
      <div className="words">
        {words.map((w, i) => (
          <span key={i} className="word">
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}
