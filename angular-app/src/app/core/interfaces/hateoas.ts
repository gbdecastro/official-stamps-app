export interface Link {
    href: string;
}

export interface Links {
    [rel: string]: Link;
}

export interface Resource {
    _links: Links;
}
