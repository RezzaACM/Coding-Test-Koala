PGDMP     -    2                y         
   koala-test     13.2 (Ubuntu 13.2-1.pgdg18.04+1)     13.2 (Ubuntu 13.2-1.pgdg18.04+1) #    ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    16653 
   koala-test    DATABASE     a   CREATE DATABASE "koala-test" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';
    DROP DATABASE "koala-test";
                postgres    false                        3079    16724 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                   false            ?           0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                        false    2            ?            1259    16654 	   customers    TABLE     ?  CREATE TABLE public.customers (
    customer_id character varying(64) NOT NULL,
    customer_name character varying(80) NOT NULL,
    email character varying(50) NOT NULL,
    phone_number character varying(20) NOT NULL,
    dob date NOT NULL,
    sex boolean NOT NULL,
    salt character varying(80) NOT NULL,
    password character varying(400) NOT NULL,
    created_date timestamp without time zone NOT NULL
);
    DROP TABLE public.customers;
       public         heap    postgres    false            ?            1259    16735    oauth_access_token    TABLE       CREATE TABLE public.oauth_access_token (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    customer_id character varying(64) NOT NULL,
    revoke boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT now(),
    expired_at timestamp without time zone
);
 &   DROP TABLE public.oauth_access_token;
       public         heap    postgres    false    2            ?            1259    16748    oauth_refresh_token    TABLE     (  CREATE TABLE public.oauth_refresh_token (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    access_token_id uuid NOT NULL,
    token text NOT NULL,
    revoke boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT now(),
    expired_at timestamp without time zone
);
 '   DROP TABLE public.oauth_refresh_token;
       public         heap    postgres    false    2            ?            1259    16683    order_details    TABLE     ?   CREATE TABLE public.order_details (
    order_detail_id character varying(60) NOT NULL,
    order_id character varying(64) NOT NULL,
    product_id character varying(64),
    qty integer,
    created_date timestamp without time zone
);
 !   DROP TABLE public.order_details;
       public         heap    postgres    false            ?            1259    16709    orders    TABLE       CREATE TABLE public.orders (
    order_id character varying(64) NOT NULL,
    customer_id character varying(64) NOT NULL,
    order_number character varying(40) NOT NULL,
    order_date timestamp without time zone NOT NULL,
    payment_method_id character varying(64) NOT NULL
);
    DROP TABLE public.orders;
       public         heap    postgres    false            ?            1259    16673    payment_methods    TABLE     ?   CREATE TABLE public.payment_methods (
    payment_method_id character varying(64) NOT NULL,
    method_name character varying(70) NOT NULL,
    code character varying(10) NOT NULL,
    created_date timestamp without time zone
);
 #   DROP TABLE public.payment_methods;
       public         heap    postgres    false            ?            1259    16668    products    TABLE     ?   CREATE TABLE public.products (
    product_id character varying(64) NOT NULL,
    product_name character varying(60),
    basic_price integer,
    created_date timestamp without time zone
);
    DROP TABLE public.products;
       public         heap    postgres    false            ?          0    16654 	   customers 
   TABLE DATA           |   COPY public.customers (customer_id, customer_name, email, phone_number, dob, sex, salt, password, created_date) FROM stdin;
    public          postgres    false    201   .       ?          0    16735    oauth_access_token 
   TABLE DATA           ]   COPY public.oauth_access_token (id, customer_id, revoke, created_at, expired_at) FROM stdin;
    public          postgres    false    206   $/       ?          0    16748    oauth_refresh_token 
   TABLE DATA           i   COPY public.oauth_refresh_token (id, access_token_id, token, revoke, created_at, expired_at) FROM stdin;
    public          postgres    false    207   ?0       ?          0    16683    order_details 
   TABLE DATA           a   COPY public.order_details (order_detail_id, order_id, product_id, qty, created_date) FROM stdin;
    public          postgres    false    204   ?3       ?          0    16709    orders 
   TABLE DATA           d   COPY public.orders (order_id, customer_id, order_number, order_date, payment_method_id) FROM stdin;
    public          postgres    false    205   ?3       ?          0    16673    payment_methods 
   TABLE DATA           ]   COPY public.payment_methods (payment_method_id, method_name, code, created_date) FROM stdin;
    public          postgres    false    203   ?3       ?          0    16668    products 
   TABLE DATA           W   COPY public.products (product_id, product_name, basic_price, created_date) FROM stdin;
    public          postgres    false    202   4       7           2606    16663 %   customers customers_customer_name_key 
   CONSTRAINT     i   ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_customer_name_key UNIQUE (customer_name);
 O   ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_customer_name_key;
       public            postgres    false    201            9           2606    16665    customers customers_email_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_email_key UNIQUE (email);
 G   ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_email_key;
       public            postgres    false    201            ;           2606    16667 $   customers customers_phone_number_key 
   CONSTRAINT     g   ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_phone_number_key UNIQUE (phone_number);
 N   ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_phone_number_key;
       public            postgres    false    201            =           2606    16661    customers customers_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (customer_id);
 B   ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_pkey;
       public            postgres    false    201            G           2606    16742 *   oauth_access_token oauth_access_token_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.oauth_access_token
    ADD CONSTRAINT oauth_access_token_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.oauth_access_token DROP CONSTRAINT oauth_access_token_pkey;
       public            postgres    false    206            I           2606    16758 ,   oauth_refresh_token oauth_refresh_token_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.oauth_refresh_token
    ADD CONSTRAINT oauth_refresh_token_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.oauth_refresh_token DROP CONSTRAINT oauth_refresh_token_pkey;
       public            postgres    false    207            C           2606    16687     order_details order_details_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT order_details_pkey PRIMARY KEY (order_detail_id);
 J   ALTER TABLE ONLY public.order_details DROP CONSTRAINT order_details_pkey;
       public            postgres    false    204            E           2606    16713    orders orders_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (order_id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            postgres    false    205            A           2606    16677 $   payment_methods payment_methods_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public.payment_methods
    ADD CONSTRAINT payment_methods_pkey PRIMARY KEY (payment_method_id);
 N   ALTER TABLE ONLY public.payment_methods DROP CONSTRAINT payment_methods_pkey;
       public            postgres    false    203            ?           2606    16672    products products_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (product_id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    202            M           2606    16743 6   oauth_access_token oauth_access_token_customer_id_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.oauth_access_token
    ADD CONSTRAINT oauth_access_token_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 `   ALTER TABLE ONLY public.oauth_access_token DROP CONSTRAINT oauth_access_token_customer_id_fkey;
       public          postgres    false    206    2877    201            N           2606    16759 <   oauth_refresh_token oauth_refresh_token_access_token_id_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.oauth_refresh_token
    ADD CONSTRAINT oauth_refresh_token_access_token_id_fkey FOREIGN KEY (access_token_id) REFERENCES public.oauth_access_token(id);
 f   ALTER TABLE ONLY public.oauth_refresh_token DROP CONSTRAINT oauth_refresh_token_access_token_id_fkey;
       public          postgres    false    207    206    2887            J           2606    16693 +   order_details order_details_product_id_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT order_details_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id);
 U   ALTER TABLE ONLY public.order_details DROP CONSTRAINT order_details_product_id_fkey;
       public          postgres    false    202    204    2879            K           2606    16714    orders orders_customer_id_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 H   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_customer_id_fkey;
       public          postgres    false    2877    201    205            L           2606    16719 %   orders orders_payment_methode_id_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_payment_methode_id_fkey FOREIGN KEY (payment_method_id) REFERENCES public.payment_methods(payment_method_id);
 O   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_payment_methode_id_fkey;
       public          postgres    false    205    203    2881            ?     x?m?9NAE??Sp?jy??q ?b@0 !Fh??t?d$?8y??$?'?G?c?2s"j?F?????z?????r1$(?OG{y[??1 ??Za?Q?W2@?[?:g???MQGQaE???$??? L?:۔??J??|?A???7???????"?Uj,yْb??b5i?K??fx????W?{??%??Y??	X?i?@9h??X??搼?f?5?I???Ǵ֫o?C4?Ɉ>?ZH]	??.???,?g?g?      ?   ]  x???K?!???)r?????dã8??_C+3?tg????C??m<0?Fm?A3t?s???c??)??m?	q?1?f????ǘ ??";5O?c?????i!??f?[?r?6v	?:???????4?E?4֌DO$%???+a??@/n?%?F??[w??|xR???????X_ʌ8x??6??J?;??~??49\???뿑???????N?W?̜ ???],??ד???$??T?.?????Z?x9??
?????D_7?o???????oRK??Q???@?"hD??????zϮ~"?&???A^x???=???7???Tdn??z[/xҿ????>J)_Z??t      ?   ?  x?m?]??8F??Ud??#?Z?EHb?]?ܚ?͋???폣zЧ)5???E??Ni?}?\Hg?k?c?h?7?1?a?-x??=`?^???????NPڊ1lI?}Q??e???x?աci??P??U??W??????#?0No	Skd????x??{w?v?1%?9w????2???zs??=?6?8??V???P?m}?Ε???????G?!z?t????_%?ז(T?@??
?u	?rf2?5ֆ?i-9O??g2m+? ???u?U?
Q-?????^SM???Qmo=?}???E?????1?WI??dԱ??C?o?6i?&?????H??????})a?!9S?K?ƧXJ`?????ɒ????'?n????JL??K???g?_%?Օt7?4????&??s'??e{?I?F?xg43ۍ??^?'^S	K???`?2N`?(a?m?g%??,>????????QV }&?]?EkC???zʵ&φo?Y6Ĺ޸O??TN6??-???D?R嵨?UȾ??q??2vUZ??w???I?߭?G???&?3????{?`{3????$??P??+?sy֬???tfb=??Ei???r???;X1???E95T0??2Fu4?x???????>?/b!?L??dw?Q	??s?6?cl?go'q?:??ԯJ_p???X?U1????`?]???>????M.Q~??[߷@??#PҕQg??%&x
????U?^?}?wS?      ?      x?????? ? ?      ?      x?????? ? ?      ?   R   x???q?5?trvc##C]S]Cs#C+#+S=CKcCc? ?R#N_G?? ON_? t??V?z?&?F?\1z\\\ ??h      ?   _   x?rq?5?ʯL?Wp*M*??4450?4202?50?54W02?21?22׳40?44?
 ?1?t??L?N̓?2??ejdeh?gndi`f????? ??b     