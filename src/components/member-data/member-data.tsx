import { $, component$, useComputed$ } from "@builder.io/qwik";
import type { MemberDataStore, BillStore } from "~/routes/start/[...id]";
import Button from "../button/button";
import { sum } from "~/utils/math";

export default component$(
  ({
    store,
    billStore,
    number,
  }: {
    store: MemberDataStore;
    billStore: BillStore;
    number: number;
  }) => {
    const total = useComputed$(() =>
      sum(store.items.map(({ price }) => price)),
    );

    return (
      <div class="flex flex-col gap-4 p-4 border-2 border-solid rounded border-sky-500 bg-blue-300 w-[300px]">
        <div class="flex gap-2 items-center">
          <input
            type="text"
            class="w-full shadow border-2 rounded p-1"
            placeholder={`Member ${number}`}
            value={store.name}
            onInput$={(_, el) => (store.name = el.value)}
          />
          <span class="mx-4">{store.items.length}</span>
        </div>
        <div class="flex flex-col gap-2">
          <div class="flex flex-col gap-2">
            {store.items.map((item, i) => (
              <div key={`_${item.id}`} class="flex gap-2">
                <input
                  type="text"
                  class="w-full shadow border-2 rounded p-1"
                  placeholder="Item name"
                  value={item.name}
                  onInput$={(_, el) => (item.name = el.value)}
                />
                <input
                  type="number"
                  class="w-[5em] shadow border-2 rounded p-1"
                  placeholder="Price"
                  value={item.price}
                  onInput$={(_, el) => (item.price = Number(el.value))}
                  min={0}
                />
                <Button
                  onClick$={() => {
                    store.remove(i);
                  }}
                >
                  X
                </Button>
              </div>
            ))}
            Total: {total}
          </div>
          <Button onClick$={$(() => store.add())}>Add item</Button>
          <Button
            disabledBtn={billStore.members.length < 3}
            variant="danger"
            onClick$={$(() => billStore.deleteMember(store.id!))}
          >
            Remove member
          </Button>
        </div>
      </div>
    );
  },
);
