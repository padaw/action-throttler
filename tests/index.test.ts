import { expect, it } from "bun:test";
import { Throttler } from "../src";

it("Doesn't exceed the timeout in executing push() actions", async () => {
    const throttler = new Throttler(100);
    let n = 0;

    const int = setInterval(() => {
        throttler.push(() => {
            n++;
        });
    }, 10);

    let res = await new Promise<number>((res) => {
        setTimeout(() => {
            clearInterval(int);
            res(n);
        }, 150);
    });

    expect(res).toBe(1)
});
