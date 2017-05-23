
export class Facet {
  constructor(data: Object, protected _parent_item: any) {
    for (let key in data) {
      if (data[key] !== undefined)
        this[key] = data[key];
    }
  }
}

export class Folder extends Facet{
  fileCount: number;

  constructor(data: any, parent: any) {
    super(data, parent);
  }

  get path() {
    let str = this._parent_item.name;
    if (this._parent_item.parentReference) {
      return this._parent_item.parentReference.path.slice(12) + "/" + str;
    }
    return str;
  }
}

export class File extends Facet {
  hashes: {crc32Hash: string, sha1Hash: string}
  mimeType: string;

  constructor(data: any, parent: any) {
    super(data, parent);
  }
}

export class FileSystemInfo extends Facet {
  createdDateTime: Date;
  lastModifiedDateTime: Date

  constructor(data: any, parent: any) {
    super(data, parent);

    this.createdDateTime = new Date(data.createdDateTime);
    this.lastModifiedDateTime = new Date(data.lastModifiedDateTime);
  }
}

export class Image extends Facet {
  constructor(data: any, parent: any) {
    super(data, parent);
  }
}

export class Photo extends Facet {
  takenDateTime: Date;
  cameraMake: string;
  cameraModel: string;
  fNumber: number;
  exposureNumerator: number;
  exposureDenominator: number;
  focalLength: number;
  iso: number;

  constructor(data: any, parent: any) {
    super(data, parent);
    this.takenDateTime = new Date(data.takenDateTime);
  }
}

export class Video extends Facet {
  bitrate: number;
  duration: number;
  height:  number;
  width: number;

  constructor(data: any, parent: any) {
    super(data, parent);
  }
}

export class Location extends Facet {
  altitude: number;
  latitude: number;
  longitude: number;

  constructor(data: any, parent: any) {
    super(data, parent);

  }
}

export class Remote extends Facet {
  constructor(data: any, parent: any) {
    super(data, parent);

  }
}

export class SearchResult extends Facet {
  constructor(data: any, parent: any) {
    super(data, parent);

  }
}

export class Deleted extends Facet {
  constructor(data: any, parent: any) {
    super(data, parent);

  }
}

export class SpecialFolder extends Facet {
  constructor(data: any, parent: any) {
    super(data, parent);

  }
}

export class Quota extends Facet {
  total: number;
  used: number;
  remaining: number;
  deleted: number;
  state: string; // "normal | nearing | critical | exceeded"

  constructor(data: any, parent: any) {
    super(data, parent);
  }
}

export class Shared extends Facet {
  constructor(data: any, parent: any) {
    super(data, parent);

  }
}
