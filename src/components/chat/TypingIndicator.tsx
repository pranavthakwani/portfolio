export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      <span className="w-1.5 h-1.5 rounded-full bg-ink-300 animate-typing-dot-1" />
      <span className="w-1.5 h-1.5 rounded-full bg-ink-300 animate-typing-dot-2" />
      <span className="w-1.5 h-1.5 rounded-full bg-ink-300 animate-typing-dot-3" />
    </div>
  );
}
