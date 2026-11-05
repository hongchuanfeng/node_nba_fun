import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import { players, teams } from "@/lib/data";
import type { Category, Locale } from "@/lib/types";

export interface FilterValues {
  q?: string;
  player?: string;
  team?: string;
  year?: string;
  tag?: string;
  category?: string;
}

export function ContentFilters({
  dict,
  values,
  tags,
  years,
  categories = ["funny", "warm", "iconic", "controversy"],
  action,
}: {
  locale: Locale;
  dict: Dictionary;
  values: FilterValues;
  tags: string[];
  years: number[];
  categories?: Category[];
  action: string;
}) {
  return (
    <form className="panel" method="get" action={action}>
      <h3>{dict.list.filters}</h3>
      <div className="field">
        <label htmlFor="q">{dict.list.keyword}</label>
        <input
          id="q"
          type="text"
          name="q"
          defaultValue={values.q ?? ""}
          placeholder={dict.list.searchPlaceholder}
        />
      </div>
      <div className="field">
        <label htmlFor="player">{dict.list.player}</label>
        <select id="player" name="player" defaultValue={values.player ?? ""}>
          <option value="">{dict.list.all}</option>
          {players.map((player) => (
            <option key={player.id} value={player.id}>
              {player.shortName}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="team">{dict.list.team}</label>
        <select id="team" name="team" defaultValue={values.team ?? ""}>
          <option value="">{dict.list.all}</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.shortName}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="year">{dict.list.year}</label>
        <select id="year" name="year" defaultValue={values.year ?? ""}>
          <option value="">{dict.list.all}</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="tag">{dict.list.tag}</label>
        <select id="tag" name="tag" defaultValue={values.tag ?? ""}>
          <option value="">{dict.list.all}</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              #{tag}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="category">{dict.list.category}</label>
        <select id="category" name="category" defaultValue={values.category ?? ""}>
          <option value="">{dict.list.all}</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {dict.category[category]}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-actions">
        <button className="btn small" type="submit">
          {dict.list.filters}
        </button>
        <Link className="btn small ghost" href={action}>
          {dict.list.reset}
        </Link>
      </div>
    </form>
  );
}
