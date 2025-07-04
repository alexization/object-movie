export abstract class InMemoryDAO<T> {
    private currentId: number = 1;
    private readonly objects: T[] = [];

    protected findMany(condition: (item: T) => boolean): T[] {
        return this.objects.filter(condition);
    }

    protected findOne(condition: (item: T) => boolean): T | null {
        return this.objects.find(condition) ?? null;
    }

    public insert(object: T): void {
        this.setIdIfPossible(object);
        this.objects.push(object);
    }

    private setIdIfPossible(object: T): void {
        try {
            (object as any).id = this.currentId;
            this.currentId++;
        } catch (error) {
            console.error(error);
        }
    }
}
