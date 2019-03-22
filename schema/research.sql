CREATE TABLE public."RESEARCH"
(
    "ID" integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    "NAME" character varying(50)[] COLLATE pg_catalog."default" NOT NULL,
    "ORG_ID" integer NOT NULL,
    "INIT_DATE" date,
    "LAST_PATIENT_DATE" date,
    "CONTACT" text COLLATE pg_catalog."default",
    "NOTE" text COLLATE pg_catalog."default",
    "ACTIVE" boolean NOT NULL,
    CONSTRAINT "RESEARCH_pkey" PRIMARY KEY ("ID"),
    CONSTRAINT "RESEARCH_NAME_key" UNIQUE ("NAME")

)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."RESEARCH"
    OWNER to postgres;