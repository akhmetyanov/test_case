CREATE DATABASE file_storage_test
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'ru_RU.UTF-8'
    LC_CTYPE = 'ru_RU.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

GRANT TEMPORARY, CONNECT ON DATABASE file_storage TO PUBLIC;

\c file_storage_test;

CREATE TABLE IF NOT EXISTS public.file
(
    id SERIAL,
    parent_id bigint,
    name character varying(50) COLLATE pg_catalog."default",
    created_date date,
    updated_date date,
    extention bigint,
    CONSTRAINT file_pkey PRIMARY KEY (id),
    CONSTRAINT key FOREIGN KEY (parent_id)
        REFERENCES public.file (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

CREATE TABLE IF NOT EXISTS public.point_data
(
    id SERIAL,
    file_id bigint NOT NULL,
    data point,
    CONSTRAINT point_data_pkey PRIMARY KEY (id, file_id),
    CONSTRAINT fk_file_id FOREIGN KEY (file_id)
        REFERENCES public.file (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID
);

CREATE TABLE IF NOT EXISTS public.line_data
(
    id SERIAL,
    file_id bigint NOT NULL,
    data line,
    CONSTRAINT line_data_pkey PRIMARY KEY (id, file_id),
    CONSTRAINT fk_file_id FOREIGN KEY (file_id)
        REFERENCES public.file (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID
);

CREATE TABLE IF NOT EXISTS public.polygone_data
(
    id SERIAL,
    parent_id bigint NOT NULL,
    data polygon,
    CONSTRAINT polygone_data_pkey PRIMARY KEY (id, parent_id),
    CONSTRAINT fk_file_id FOREIGN KEY (parent_id)
        REFERENCES public.file (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID
);

CREATE TABLE IF NOT EXISTS public.text_data
(
    id SERIAL,
    file_id bigint NOT NULL,
    data text COLLATE pg_catalog."default",
    CONSTRAINT text_data_pkey PRIMARY KEY (id, file_id),
    CONSTRAINT fk_file_id FOREIGN KEY (file_id)
        REFERENCES public.file (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);