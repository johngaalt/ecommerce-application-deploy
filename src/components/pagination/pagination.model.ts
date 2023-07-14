export class PaginationModel {
  pageCount = 1;
  currentPage = 1;

  init(count: number, limit: number, page: number) {
    this.pageCount = Math.ceil(count / limit);
    this.currentPage = page;
  }
}
