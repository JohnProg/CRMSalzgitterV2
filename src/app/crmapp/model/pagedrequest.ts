

export class PagedRequest {

    public page: number;
    public pageSize: number;

    constructor(p: number, psize: number ) {
        this.page = p;
        this.pageSize = psize;
    }
}