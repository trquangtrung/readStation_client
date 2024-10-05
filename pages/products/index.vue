<template>
  <div class="md:py-10 h-auto mx-auto md:px-20 px-8 container">

    <Head>
      <Title>ReadStation | Sản phẩm</Title>
      <Meta name="description" content="Sản phẩm" />
      <Meta property="og:title" content="ReadStation | Sản phẩm" />
      <Meta property="og:description" content="Sản phẩm" />
    </Head>
    <div class="flex gap-6">
      <div class="w-1/5 rounded-lg h-fit flex flex-col space-y-4">
        <div class="px-3 pb-2 text-xl font-semibold">Khám phá theo:</div>

        <div class="bg-white">
          <div class="text-base cursor-pointer rounded-xl border">
            <div class="flex justify-between items-center px-4 py-2" @click="() => handleIsShow('category')">
              <span>Danh mục</span>
              <img ref="bookIcon2" class="rotate-180" width="20" height="20"
                src="https://salt.tikicdn.com/cache/100x100/ts/ta/6c/37/a4/7ee5c72cc1c35b6b90b70b2ce3498215.png.webp"
                alt="" />
            </div>
            <div class="border-t px-4 py-2 h-[300px] overflow-auto" v-if="isShow.includes('category')">
              <!--  -->

              <ul class="px-4 space-y-1">
                <li>
                  <a-radio :checked="filter.category_id === null ? true : false" @click="
                    handleCheckbox({
                      type: 'category_id',
                      id: null,
                    })
                    ">Tất cả</a-radio>
                </li>
                <li class="flex items-center" v-for="(category, index) in categoryStore?.categories
                  ?.categories" :key="index">
                  <a-radio :checked="category.id === filter.category_id ? true : false" @click="
                    handleCheckbox({
                      type: 'category_id',
                      id: category.id,
                    })
                    ">
                    {{ category?.name }}
                  </a-radio>
                </li>
              </ul>
              <!--  -->
            </div>
          </div>
        </div>

        <div class="bg-white">
          <div class="text-base cursor-pointer rounded-xl border">
            <div class="flex justify-between items-center px-4 py-2" @click="() => handleIsShow('author')">
              <span>Tác giả</span>
              <img ref="bookIcon2" class="rotate-180" width="20" height="20"
                src="https://salt.tikicdn.com/cache/100x100/ts/ta/6c/37/a4/7ee5c72cc1c35b6b90b70b2ce3498215.png.webp"
                alt="" />
            </div>
            <div class="border-t px-4 py-2 h-[300px] overflow-auto" v-if="isShow.includes('author')">
              <ul class="px-4 space-y-1">
                <li>
                  <a-radio :checked="filter.author_id === null ? true : false" @click="
                    handleCheckbox({
                      type: 'author_id',
                      id: null,
                    })
                    ">Tất cả</a-radio>
                </li>
                <li class="flex items-center" v-for="(author, index) in authorStore?.authorClient?.authors"
                  :key="index">
                  <a-radio :checked="author.id === filter.author_id ? true : false" @click="
                    handleCheckbox({
                      type: 'author_id',
                      id: author.id,
                    })
                    ">
                    {{ author?.author }}</a-radio>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-white">
          <div class="text-base cursor-pointer rounded-xl border">
            <div class="flex justify-between items-center px-4 py-2" @click="() => handleIsShow('publishing')">
              <span>Nhà xuất bản</span>
              <img ref="bookIcon2" class="rotate-180" width="20" height="20"
                src="https://salt.tikicdn.com/cache/100x100/ts/ta/6c/37/a4/7ee5c72cc1c35b6b90b70b2ce3498215.png.webp"
                alt="" />
            </div>
            <div class="border-t px-4 py-2 h-[300px] overflow-auto" v-if="isShow.includes('publishing')">
              <ul class="px-4 space-y-1">
                <li>
                  <a-radio :checked="filter.publishing_company_id === null ? true : false
                    " @click="
                      handleCheckbox({
                        type: 'publishing_company_id',
                        id: null,
                      })
                      ">
                    Tất cả
                  </a-radio>
                </li>
                <li class="flex items-center" v-for="(company, index) in publishingCompanyStore
                  ?.publishingCompany?.publishing_companies" :key="index">
                  <a-radio :checked="company.id === filter.publishing_company_id ? true : false
                    " @click="
                      handleCheckbox({
                        type: 'publishing_company_id',
                        id: company.id,
                      })
                      ">
                    {{ company?.name }}
                  </a-radio>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-white">
          <div class="text-base cursor-pointer rounded-xl border">
            <div class="flex justify-between items-center px-4 py-2" @click="() => handleIsShow('rating')">
              <span>Đánh giá</span>
              <img ref="bookIcon2" class="rotate-180" width="20" height="20"
                src="https://salt.tikicdn.com/cache/100x100/ts/ta/6c/37/a4/7ee5c72cc1c35b6b90b70b2ce3498215.png.webp"
                alt="" />
            </div>
            <div v-if="isShow.includes('rating')" class="border-t px-4 py-2">
              <ul class="px-4 space-y-1">
                <li>
                  <a-radio :checked="filter.rating === null ? true : false" @click="
                    handleCheckbox({
                      type: 'rating',
                      id: null,
                    })
                    ">Tất cả</a-radio>
                </li>

                <li>
                  <a-radio class="flex items-center" :checked="filter.rating === 5 ? true : false" @click="
                    handleCheckbox({
                      type: 'rating',
                      id: 5,
                    })
                    ">
                    <CommonRating :rating="5" />
                  </a-radio>
                </li>
                <li>
                  <a-radio class="flex items-center" :checked="filter.rating === 4 ? true : false" @click="
                    handleCheckbox({
                      type: 'rating',
                      id: 4,
                    })
                    ">
                    <CommonRating :rating="4" />
                  </a-radio>
                </li>
                <li>
                  <a-radio class="flex items-center" :checked="filter.rating === 3 ? true : false" @click="
                    handleCheckbox({
                      type: 'rating',
                      id: 3,
                    })
                    ">
                    <CommonRating :rating="3" />
                  </a-radio>
                </li>
                <li>
                  <a-radio class="flex items-center" :checked="filter.rating === 2 ? true : false" @click="
                    handleCheckbox({
                      type: 'rating',
                      id: 2,
                    })
                    ">
                    <CommonRating :rating="2" />
                  </a-radio>
                </li>
                <li>
                  <a-radio class="flex items-center" :checked="filter.rating === 1 ? true : false" @click="
                    handleCheckbox({
                      type: 'rating',
                      id: 1,
                    })
                    ">
                    <CommonRating :rating="1" />
                  </a-radio>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="w-4/5 h-fit">
        <div class="grid gap-y-4">
          <div class="bg-white rounded-lg border">
            <div class="text-xl px-4 py-3" v-if="bookFromQuery">
              Kết quả tìm kiếm cho từ “
              <span class="text-orange-500">{{ bookFromQuery }}</span> ”
            </div>
            <div class="text-xl px-4 py-3" v-else>Tất cả sản phẩm</div>
            <div class="flex gap-5 justify-between items-center px-4 h-fit border-t">
              <div class="text-base">
                {{ bookstore?.books?.totalResults }} sản phẩm
              </div>
              <div class="text-base px-4 py-3 text-right flex items-center">
                <div class="px-4 text-[#cac9cd]">Sắp xếp</div>
                <a-select :options="sortOptions" v-model:value="filter.sort" @change="handleSortChange"
                  style="width: 100px">
                </a-select>
              </div>
            </div>
          </div>

          <div>
            <div class="grid grid-cols-4">
              <CommonBookShop v-for="(book, index) in bookstore?.books?.books" :key="book.id || index" :book="book" />
            </div>
          </div>
          <div class="flex justify-center">
            <a-pagination v-model:current="current" :total="bookstore?.books?.totalResults"
              :pageSize="bookstore?.books?.pageSize" :showSizeChanger="null" show-less-items />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const publishingCompanyStore = usePublishingCompanyPublicStore();
const bookstore = useBookPublicStore();
const categoryStore = usePublicCategoryStore();
const authorStore = useAuthorPublicStore();
const route = useRoute();
const bookFromQuery = ref(route.query.search);
const categoryFromQuery = route.query.category;
const authorFromQuery = route.query.author;
const current = ref(1);
const isShow = ref([]);
const filter = ref({
  sort: "desc",
  category_id: null,
  author_id: null,
  publishing_company_id: null,
  rating: null,
});

// Tìm kiếm
watch(
  () => route.query.search,
  (newSearch) => {
    bookFromQuery.value = newSearch;
    fetchBooks();
  }
);

// Chỉ định danh mục
const updateCategoryFromQuery = async (categorySlug) => {
  await categoryStore.getAllCategoryClient({ type: "book", pageSize: 1000 });

  const matchedCategory = categoryStore?.categories?.categories?.find(
    (cate) => cate.slug === categorySlug
  );

  if (matchedCategory) {
    filter.value.category_id = matchedCategory.id;
    if (!isShow.value.includes("category")) {
      isShow.value.push("category");
    }
  } else {
    filter.value.category_id = null;
  }

  fetchBooks();
};

onMounted(() => {
  updateCategoryFromQuery(categoryFromQuery);
});

watch(
  () => route.query.category,
  (newCategory) => {
    updateCategoryFromQuery(newCategory);
  }
);

// Chỉ định theo tác giả
const updateAuthorFromQuery = async (authorSlug) => {

  await authorStore.getAllAuthorClient({
    pageSize: 1000,
  });
  const matchedAuthor = authorStore?.authorClient?.authors?.find(
    (author) => author.slug === authorSlug
  );
  if (matchedAuthor) {
    filter.value.author_id = matchedAuthor.id;
    if (!isShow.value.includes("author")) {
      isShow.value.push("author");
    }
  } else {
    filter.value.author_id = null;
  }
  fetchBooks();
};

onMounted(() => {
  updateAuthorFromQuery(authorFromQuery);
});

watch(
  () => route.query.author,
  (newAuthor) => {
    updateAuthorFromQuery(newAuthor);
  }
);

const sortOptions = [
  {
    label: "Mới nhất",
    value: "desc",
  },
  {
    label: "Cũ nhất",
    value: "asc",
  },
  {
    label: "Phổ biến",
    value: "popular",
  },
];
const handleIsShow = (section) => {
  if (isShow.value.includes(section)) {
    isShow.value = [...isShow.value].filter((item) => item !== section);
  } else {
    isShow.value = [...isShow.value, section];
  }
};

const fetchBooks = async () => {
  try {
    await bookstore.getAllBooks({
      page: current.value,
      pageSize: 12,
      sort: filter.value.sort,
      category_id: filter.value.category_id,
      author_id: filter.value.author_id,
      publishing_company_id: filter.value.publishing_company_id,
      rating: filter.value.rating,
      search: bookFromQuery.value,
    });
  } catch (error) {
    console.error(error);
  }
};

const handleCheckbox = ({ type, id }: any) => {
  switch (type) {
    case "category_id":
      filter.value.category_id = id;
      break;
    case "author_id":
      filter.value.author_id = id;
      break;
    case "publishing_company_id":
      filter.value.publishing_company_id = id;
      break;
    case "rating":
      filter.value.rating = id;
      break;
    default:
      break;
  }
  // console.log("filter.value.rating", filter.value.rating);

};

watch(
  filter,
  () => {
    current.value = 1;
    fetchBooks();
  },
  { deep: true, immediate: true }
)
useAsyncData(
  async () => {
    try {
      await fetchBooks();
    } catch (error) {
      console.error(error);
    }
  },
  {
    immediate: true,
    watch: [current],
  }
);

const handleSortChange = (value: string) => {
  filter.value.sort = value;
  current.value = 1;
  fetchBooks();
};

useAsyncData(async () => {
  await authorStore.getAllAuthorClient({ pageSize: 1000 });
  await categoryStore.getAllCategoryClient({ type: "book", pageSize: 1000 });
  await publishingCompanyStore.getAllPublishingCompanyClient({ pageSize: 1000 });
});

</script>

<style scoped>
:deep(.ant-select-selector) {
  border-radius: 200px !important;
}
</style>
<style scoped>
:deep(.ant-select-selector) {
  border-radius: 200px !important;
}
</style>
