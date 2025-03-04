PGDMP                     	    y            simform_todo    13.3    13.3     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    24936    simform_todo    DATABASE     h   CREATE DATABASE simform_todo WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_India.1252';
    DROP DATABASE simform_todo;
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                postgres    false            �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   postgres    false    3            �            1259    24973 
   categories    TABLE     a  CREATE TABLE public.categories (
    id integer NOT NULL,
    category_name character varying NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    user_id integer
);
    DROP TABLE public.categories;
       public         heap    postgres    false    3            �            1259    24971    categories_id_seq    SEQUENCE     �   CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.categories_id_seq;
       public          postgres    false    3    203            �           0    0    categories_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;
          public          postgres    false    202            �            1259    24993    tasks    TABLE     l  CREATE TABLE public.tasks (
    id integer NOT NULL,
    task character varying NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    category_id integer,
    user_id integer
);
    DROP TABLE public.tasks;
       public         heap    postgres    false    3            �            1259    24991    tasks_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.tasks_id_seq;
       public          postgres    false    205    3            �           0    0    tasks_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;
          public          postgres    false    204            �            1259    24957    users    TABLE     �  CREATE TABLE public.users (
    id integer NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false    3            �            1259    24955    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    3    201            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    200            5           2604    24976    categories id    DEFAULT     n   ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);
 <   ALTER TABLE public.categories ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202    203            :           2604    24996    tasks id    DEFAULT     d   ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);
 7   ALTER TABLE public.tasks ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    205    204    205            1           2604    24960    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    201    200    201            �          0    24973 
   categories 
   TABLE DATA           o   COPY public.categories (id, category_name, is_active, is_deleted, created_at, updated_at, user_id) FROM stdin;
    public          postgres    false    203   �$       �          0    24993    tasks 
   TABLE DATA           n   COPY public.tasks (id, task, is_active, is_deleted, created_at, updated_at, category_id, user_id) FROM stdin;
    public          postgres    false    205   %       �          0    24957    users 
   TABLE DATA           n   COPY public.users (id, first_name, last_name, email, password, is_active, created_at, updated_at) FROM stdin;
    public          postgres    false    201   �%       �           0    0    categories_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.categories_id_seq', 7, true);
          public          postgres    false    202            �           0    0    tasks_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.tasks_id_seq', 3, true);
          public          postgres    false    204            �           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 21, true);
          public          postgres    false    200            D           2606    24985 )   categories PK_24dbc6126a28ff948da33e97d3b 
   CONSTRAINT     i   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY (id);
 U   ALTER TABLE ONLY public.categories DROP CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b";
       public            postgres    false    203            F           2606    25005 $   tasks PK_8d12ff38fcc62aaba2cab748772 
   CONSTRAINT     d   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.tasks DROP CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772";
       public            postgres    false    205            @           2606    24968 $   users PK_a3ffb1c0c8416b9fc6f907b7433 
   CONSTRAINT     d   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433";
       public            postgres    false    201            B           2606    24970 $   users UQ_97672ac88f789774dd47f7c8be3 
   CONSTRAINT     b   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3";
       public            postgres    false    201            G           2606    24986 )   categories FK_2296b7fe012d95646fa41921c8b    FK CONSTRAINT     �   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT "FK_2296b7fe012d95646fa41921c8b" FOREIGN KEY (user_id) REFERENCES public.users(id);
 U   ALTER TABLE ONLY public.categories DROP CONSTRAINT "FK_2296b7fe012d95646fa41921c8b";
       public          postgres    false    203    2880    201            H           2606    25006 $   tasks FK_d94d89c9ec19bc4470e3368c905    FK CONSTRAINT     �   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT "FK_d94d89c9ec19bc4470e3368c905" FOREIGN KEY (category_id) REFERENCES public.categories(id);
 P   ALTER TABLE ONLY public.tasks DROP CONSTRAINT "FK_d94d89c9ec19bc4470e3368c905";
       public          postgres    false    203    2884    205            I           2606    25011 $   tasks FK_db55af84c226af9dce09487b61b    FK CONSTRAINT     �   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT "FK_db55af84c226af9dce09487b61b" FOREIGN KEY (user_id) REFERENCES public.users(id);
 P   ALTER TABLE ONLY public.tasks DROP CONSTRAINT "FK_db55af84c226af9dce09487b61b";
       public          postgres    false    205    201    2880            �   �   x�}�=
1��zr����|3���)�llD4���`��M�"X?/o�6��:ƛ^t#�a����1|�EX��8�c��I6�!zd�7U�bA}�9E��L���8o����'Y �l\g΂��d��̉��ss-�      �   �   x�}�;
1 �S��>ټ���6Q�5�"��M%,����p^˭>�:܁<�~�d	3S��bT�x���_�����opp¢,;�1{v�4i�y�.mi��mv)ﲶ�Uj���9�d�PH��h���"�3�      �   �   x�}�Ao�0������զ_[��ɹd.#�AM� %P�����O�l�._��I�<y�E~�Y'Z5Y�ʑ��u�'�I���f@g�[Ty<G��brBa�6�ڡ�[��	�;~�Yb���4~�-o~*���h�_��'���Ŗ�CD�e�W�8oؾ׿{�bܣ��%�r�O(�`��O����w�)��u,|�Q�za�{���3~y���zb�|[�v_��߉�1�'%��	�c�+�h�     