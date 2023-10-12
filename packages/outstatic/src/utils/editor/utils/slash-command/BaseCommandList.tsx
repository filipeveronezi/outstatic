import {
  CommandItemProps,
  updateScrollView
} from '../../extensions/slash-command'
import { useLayoutEffect, useRef } from 'react'

export const BaseCommandList = ({
  items,
  selectedIndex,
  selectItem
}: {
  items: CommandItemProps[]
  selectedIndex: number
  selectItem: (index: number) => void
}) => {
  const commandListContainer = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const container = commandListContainer?.current

    const item = container?.children[selectedIndex] as HTMLElement

    if (item && container) updateScrollView(container, item)
  }, [selectedIndex])

  return items.length > 0 ? (
    <div id="outstatic">
      <div
        id="slash-command"
        ref={commandListContainer}
        className="z-50 h-auto max-h-[330px] w-72 overflow-y-auto rounded-md border border-stone-200 bg-white px-1 py-2 shadow-md transition-all"
      >
        {items.map((item: CommandItemProps, index: number) => {
          return (
            <button
              className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm text-stone-900 hover:bg-stone-100 ${
                index === selectedIndex ? 'bg-stone-100 text-stone-900' : ''
              }`}
              key={index}
              onClick={() => selectItem(index)}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md border border-stone-200 bg-white">
                {item.icon}
              </div>
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-xs text-stone-500">{item.description}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  ) : null
}