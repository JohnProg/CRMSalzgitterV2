import * as Facets from './facets';


export class Drive {

  public static Personal = "personal";
  public static Business = "business";

  id: string;
  driveType: string;
  owner: IdentitySet;
  quota: Facets.Quota;

  constructor(data: any) {
    this.id = data.id;
    this.driveType = data.driveType;
    this.owner = new IdentitySet(data.owner);
    this.quota = new Facets.Quota(data.quota, this);
  }

  get children(): string {
    return this.root + "/children";
  }

  get root(): string {
    return "drives/" + this.id + "/root";
  }
}

export class ItemReference {
  driveId: string;
  id: string;
  path: string;

  constructor(data: any) {
    this.driveId = data.driveId;
    this.id = data.id;
    this.path = data.path;
  }
}

export class Identity {
  id: string;
  displayName: string;

  constructor(data: any) {
    this.id = data.id;
    this.displayName = data.displayName;
  }
}

export class IdentitySet {
  user: Identity;
  application: Identity;
  device: Identity;

  constructor(data: any) {
    this.user = new Identity(data.user);
    if (data.application)
      this.application = new Identity(data.application);
    if (data.device)
      this.device = new Identity(data.device);
  }
}

export class Item {
  id: string;
  name: string;
  eTag: string;
  cTag: string;
  createdBy: IdentitySet;
  createdDateTime: Date; // timestamp
  lastModifiedBy: IdentitySet;
  lastModifiedDateTime: Date;  // timestamp
  size: number; // max 1024
  webUrl: string; // url
  description: string;
  parentReference: ItemReference;
  // children: Array<Item>;
  folder: Facets.Folder;
  file: Facets.File;
  fileSystemInfo: Facets.FileSystemInfo;
  image: Facets.Image;
  photo: Facets.Photo;
  audio: Facets.Video;
  video: Facets.Video;
  location: Facets.Location;
  remoteItem: Facets.Remote;
  searchResult: Facets.SearchResult;
  deleted: Facets.Deleted;
  specialFolder: Facets.SpecialFolder;
  thumbnails: Array<ThumbnailSet>;
  shared: Facets.Shared;

  private _parent: Item = null;

  // name.conflictBehavior: string;
  // content.downloadUrl: url;
  // content.sourceUrl: url

  constructor(data?: any, parent?: Item) {
    if (parent) this._parent = parent;

    if (data === null || data == undefined) {
      return;
    }
    if (data.cTag) this.cTag = data.cTag; //: "adDpBMkRGNDYyOUY0OUI3NTFEITEwNi42MzU4OTA0ODQ1MTE1MzAwMDA"
    if (data.createdBy) this.createdBy = new IdentitySet(data.createdBy); //: {user: {displayName: "Luca Cossaro", id: "a2df4629f49b751d",…}}
    if (data.createdDateTime) this.createdDateTime = new Date(data.createdDateTime); //: "2012-03-02T17:59:11.507Z"
    if (data.eTag) this.eTag = data.eTag; //: "aQTJERjQ2MjlGNDlCNzUxRCExMDYuMA"
    if (data.fileSystemInfo) this.fileSystemInfo = new Facets.FileSystemInfo(data.fileSystemInfo, this); //: {createdDateTime: "2012-03-02T17:59:11.507Z", lastModifiedDateTime: "2012-03-02T17:59:11.507Z"}
    if (data.folder) this.folder = new Facets.Folder(data.folder, this); //: {childCount: 52}
    if (data.id) this.id = data.id; //: "A2DF4629F49B751D!106"
    if (data.lastModifiedBy) this.lastModifiedBy = new IdentitySet(data.lastModifiedBy); //: {user: {displayName: "Luca Cossaro", id: "a2df4629f49b751d",…}}
    if (data.lastModifiedDateTime) this.lastModifiedDateTime = new Date(data.lastModifiedDateTime); //: "2016-01-22T08:34:11.153Z"
    if (data.name) this.name = data.name; //: "Documenti"
    if (data.parentReference) this.parentReference = new ItemReference(data.parentReference); //: {driveId: "a2df4629f49b751d", id: "A2DF4629F49B751D!103", path: "/drive/root:"}
    if (data.size) this.size = data.size; //: 770409237
    if (data.specialFolder) this.specialFolder = new Facets.SpecialFolder(data.specialFolder, this); //: {name: "documents"}
    if (data.webUrl) this.webUrl = data.webUrl; //: "https://onedrive.live.com/redir?resid=A2DF4629F49B751D!106"
    //@content.downloadUrl: "https://public-dm2306.files.1drv.com/y3myNN8BXViuCI8JxIsxOcwk-kdYbkRGslVIbEEA_YShCIB4KKKakq8_V9LqA-5Qrd3WUi0pKrktdXflGuD13C7OqhaT_LMYdAY33a_UxHcRs3qELaVWA6FlhrDiHVGiX6ijmc9ZZ6AdejbYlaxAHVU7lUsa-uDnezRsisXJOfFW6vp5QmyE77E3YUnwmsQpLGt"
    if (data.file) this.file = new Facets.File(data.file, this); // {hashes: {crc32Hash: "00E4CB4B", sha1Hash: "64F2E0B8F9814A83B97CCC8DE754C91FD591BF52"},…}
    if (data.location) this.location = new Facets.Location(data.location, this); //: {altitude: 0, latitude: 45.4562, longitude: 12.0287}
    if (data.photo) this.photo = new Facets.Photo(data.photo, this); //: {takenDateTime: "2015-12-01T18:35:07Z"}
    if (data.video) this.video = new Facets.Video(data.video, this); //: {bitrate: 20188536, duration: 69875, height: 1920, width: 1080}
  }

  get children() {
    if (this.folder)
      return "drive/items/" + this.id + "/children";

    return null;
  }

  get parent() {
    return this._parent;
  }

  isFolder(): boolean {
    return (this.folder !== undefined && this.folder !== null);
  }

  isFile(): boolean {
    return (this.file !== undefined && this.file !== null);
  }

  isPhoto(): boolean {
    return this.photo !== undefined;
  }

  isVideo(): boolean {
    return this.video !== undefined;
  }
}


class Thumbnail {

}

class ThumbnailSet {

}
