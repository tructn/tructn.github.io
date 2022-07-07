import Link from "next/link"
import React from "react"
import Date from "./date"

export default function Articles({ articles }) {
  return (
    <section>
      <ul className="transition-all flex flex-col gap-4">
        {articles
          .filter((p) => p.published)
          .map(({ id, date, title, tags }) => (
            <li key={id} className="rounded p-5 flex flex-col bg-stone-100">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl">{title}</h3>
                  <small className="text-sm">
                    <Date dateString={date} />
                  </small>
                  <Link href={`/articles/${id}`}>
                    <a className="hover:underline-offset-2 hover:underline">
                      Read more...
                    </a>
                  </Link>
                </div>
                <div>
                  {tags.map((tag, index) => {
                    return (
                      <span className="rounded text-xs mr-0 p-1" key={index}>
                        {tag}
                      </span>
                    )
                  })}
                </div>
              </div>
            </li>
          ))}
      </ul>
    </section>
  )
}
