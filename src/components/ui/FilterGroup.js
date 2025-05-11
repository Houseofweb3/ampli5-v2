import { useState } from 'react';
import FilterButton from './filterbtn';
import Image from 'next/image';

const filters = [
  { id: 'video', label: 'Video', img: '/icons/ai-video.png' },
  { id: 'thread', label: 'Thread', img: '/icons/threads.png' },
  { id: 'article', label: 'Article', img: '/icons/news.png' },
  { id: 'meme', label: 'Meme', img: '/icons/cookie.png' },
];

export default function FilterGroup() {
  const [selected, setSelected] = useState([]);
  const toggleFilter = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  };
  const isActive = (id) => selected.includes(id);
  return (
    <div className="flex gap-2 flex-wrap">
      {filters.map((filter) => (
        <FilterButton
          key={filter.id}
          active={isActive(filter.id)}
          onClick={() => toggleFilter(filter.id)}
        >
          <Image src={filter.img} alt="icon" height={24} width={24} />
          {filter.label}
        </FilterButton>
      ))}

      <FilterButton onClick={() => setSelected([])}>
        <Image src="/icons/multiplication-sign.png" alt="icon" height={24} width={24} />
        Deselect all
      </FilterButton>
    </div>
  );
}
