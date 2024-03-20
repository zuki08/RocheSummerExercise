--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: customers; Type: TABLE; Schema: public; Owner: jeff
--

CREATE TABLE public.customers (
    customerid character varying(8) NOT NULL,
    firstname character varying(50) NOT NULL,
    lastname character varying(50) NOT NULL,
    birthdate date,
    phonenumber character varying(8),
    amountpurchased real DEFAULT 0
);


ALTER TABLE public.customers OWNER TO jeff;

--
-- Name: employees; Type: TABLE; Schema: public; Owner: jeff
--

CREATE TABLE public.employees (
    employeeid character varying(8) NOT NULL,
    firstname character varying(50) NOT NULL,
    lastname character varying(50) NOT NULL,
    birthdate date
);


ALTER TABLE public.employees OWNER TO jeff;

--
-- Name: orders; Type: TABLE; Schema: public; Owner: jeff
--

CREATE TABLE public.orders (
    orderid character varying(20),
    customerid character varying(8),
    employeeid character varying(8),
    productid character varying(50),
    ordertotal real,
    orderdate date
);


ALTER TABLE public.orders OWNER TO jeff;

--
-- Name: products; Type: TABLE; Schema: public; Owner: jeff
--

CREATE TABLE public.products (
    productid character varying(50) NOT NULL,
    productname character varying(50) NOT NULL,
    category character varying(20) NOT NULL,
    price real NOT NULL
);


ALTER TABLE public.products OWNER TO jeff;

--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: jeff
--

COPY public.customers (customerid, firstname, lastname, birthdate, phonenumber, amountpurchased) FROM stdin;
\.


--
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: jeff
--

COPY public.employees (employeeid, firstname, lastname, birthdate) FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: jeff
--

COPY public.orders (orderid, customerid, employeeid, productid, ordertotal, orderdate) FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: jeff
--

COPY public.products (productid, productname, category, price) FROM stdin;
\.


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: jeff
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (customerid);


--
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: public; Owner: jeff
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (employeeid);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: jeff
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (productid);


--
-- Name: orders orders_customerid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jeff
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_customerid_fkey FOREIGN KEY (customerid) REFERENCES public.customers(customerid);


--
-- Name: orders orders_employeeid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jeff
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_employeeid_fkey FOREIGN KEY (employeeid) REFERENCES public.employees(employeeid);


--
-- Name: orders orders_productid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jeff
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_productid_fkey FOREIGN KEY (productid) REFERENCES public.products(productid);


--
-- PostgreSQL database dump complete
--

