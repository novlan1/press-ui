export function escapeString(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function getHighlightChunks({
  autoEscape,
  caseSensitive,
  keywords,
  sourceString,
}) {
  console.log({
    autoEscape,
    caseSensitive,
    keywords,
    sourceString,
  });
  const flags = caseSensitive ? 'g' : 'gi';
  const innerKeywords = Array.isArray(keywords) ? keywords : [keywords];

  // generate chunks
  let chunks = innerKeywords
    .filter(keyword => keyword)
    .reduce(
      (chunks, keyword) => {
        if (autoEscape) {
          keyword = escapeString(keyword);
        }

        const regex = new RegExp(keyword, flags);

        let match;
        while ((match = regex.exec(sourceString))) {
          const start = match.index;
          const end = regex.lastIndex;

          if (start >= end) {
            regex.lastIndex += 1;
            continue;
          }

          chunks.push({
            start,
            end,
            highlight: true,
          });
        }

        return chunks;
      },
      [],
    );

  // merge chunks
  chunks = chunks
    .sort((a, b) => a.start - b.start)
    .reduce((chunks, currentChunk) => {
      const prevChunk = chunks[chunks.length - 1];

      if (!prevChunk || currentChunk.start > prevChunk.end) {
        const unhighlightStart = prevChunk ? prevChunk.end : 0;
        const unhighlightEnd = currentChunk.start;

        if (unhighlightStart !== unhighlightEnd) {
          chunks.push({
            start: unhighlightStart,
            end: unhighlightEnd,
            highlight: false,
          });
        }

        chunks.push(currentChunk);
      } else {
        prevChunk.end = Math.max(prevChunk.end, currentChunk.end);
      }

      return chunks;
    }, []);

  const lastChunk = chunks[chunks.length - 1];

  if (!lastChunk) {
    chunks.push({
      start: 0,
      end: sourceString.length,
      highlight: false,
    });
  }

  if (lastChunk && lastChunk.end < sourceString.length) {
    chunks.push({
      start: lastChunk.end,
      end: sourceString.length,
      highlight: false,
    });
  }

  return chunks;
}
