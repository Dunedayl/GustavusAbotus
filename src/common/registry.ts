import { Constructable } from "./types";

export class BaseRegistry<T> {
    protected _classes: Constructable<T>[] = [];

    protected _instances: T[] = [];

    public get initialized(): boolean {
        return this._instances.length > 0;
    }

    public get instances(): T[] {
        return this._instances;
    }

    public init(...args: any[]): this {
        this._instances = this._classes.map(cls => this.initializeClass(cls, ...args));
        return this;
    }

    protected initializeClass(cls: Constructable<T>, ...args: any[]): T {
        return new cls(...args);
    }
}