<template>
  <div class="md:px-20 px-8 md:container md:mx-auto md:py-10 py-5">
    <Head>
      <Title>ReadStation | Giới thiệu</Title>
    </Head>
    <div>
      <div
        class="relative h-[600px] w-full bg-[url('../../assets/images/aboutus.svg')] bg-cover bg-center bg-no-repeat rounded-3xl"
      >
        <div class="absolute bottom-20 left-[320px] font-semibold text-4xl">
          <h1 class="text-4xl font-bold pb-4">Read Station</h1>
          <ul class="text-lg pb-6 space-y-2">
            <li>Ưu đãi cho khách hàng xác thực tài khoản</li>
            <li>Ưu đãi thêm cho học sinh sinh viên khi thuê sách</li>
            <li>Thế giới sách trong tầm tay bạn</li>
            <li>Mở ra thế giới sách phong phú chỉ với vài bước đơn giản</li>
          </ul>
          <NuxtLink to="/login">
            <button
              class="text-lg px-6 py-3 rounded-lg shadow-md bg-orange-500 hover:bg-orange-600 text-white"
            >
              Tham gia ngay
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="md:py-10">
      <div class="flex items-center md:items-start space-x-8">
        <div class="w-1/3">
          <img
            src="/assets/images/book-is-open.jpg"
            alt="Car Image"
            class="h-[400px] rounded-lg"
          />
        </div>
        <div class="py-6 w-2/3">
          <div class="text-3xl font-bold pb-4">Tổng quan về chúng tôi</div>
          <div class="text-lg pb-4">
            Read Station là điểm đến lý tưởng cho những người yêu sách muốn tận
            hưởng sự đa dạng của thế giới văn học mà không cần phải chi tiêu lớn
            cho việc mua sách. Khách hàng có thể đăng ký thành viên và chọn lựa
            từ một kho sách phong phú, bao gồm các thể loại từ tiểu thuyết đến
            sách khoa học, lịch sử và tự truyện. Giá cả cho thuê cũng đa dạng,
            và cửa hàng thường cung cấp dịch vụ khách hàng tốt để hỗ trợ khách
            hàng trong việc chọn sách và đáp ứng nhu cầu đọc sách.
          </div>

          <div class="text-lg">
            Read Station thường xuyên tổ chức các sự kiện văn hóa như các buổi
            đọc sách, câu chuyện kể, hoặc các hội thảo về văn hóa đọc. Điều này
            tạo ra một không gian gặp gỡ, giao lưu và chia sẻ đam mê sách giữa
            các độc giả. Không chỉ là nơi mượn sách, Read Station còn là điểm
            đến tương tác xã hội và văn hóa quan trọng đối với cộng đồng đọc
            sách.
          </div>
        </div>
      </div>
    </div>
    <div class="flex p-4">
      <!-- <div class="w-1/2">
        <img
          src="/assets/images/book-is-open.jpg"
          alt="book"
          class="h-[70%]"
        />
      </div> -->
      <div class="w-full">
        <div class="py-4">
          <div class=" ">
            <h2 class="text-3xl font-bold mb-4 text-center">
              Câu hỏi thường gặp
            </h2>
            <div class="space-y-4">
              <a-collapse
                v-model:activeKey="activeKey"
                :bordered="false"
                style="background: transparent"
              >
                <template #expandIcon="{ isActive }">
                  <caret-right-outlined :rotate="isActive ? 90 : 0" />
                </template>
                <a-collapse-panel
                  key="1"
                  header="#1. Phí cọc thuê sách"
                  :style="customStyle"
                >
                  <p v-html="text"></p>
                </a-collapse-panel>
                <a-collapse-panel
                  key="2"
                  header="#2. Phạt và bồi thường hư hỏng sách "
                  :style="customStyle"
                >
                  <p v-html="text2"></p>
                </a-collapse-panel>
                <a-collapse-panel
                  key="3"
                  header="#3. Mượn, đổi sách tại Read Station như thế nào?"
                  :style="customStyle"
                >
                  <p v-html="text3"></p>
                </a-collapse-panel>
              </a-collapse>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { NuxtLink } from "#build/components";
import { ref } from "vue";
const activeKey = ref([]);
const customStyle =
  "background: #e9e9e9;border-radius: 4px;margin-bottom: 8px;border: 0;overflow: hidden";
const text = `
Khoản đặt cọc này để hỗ trợ Read Station trong các trường hợp hư hỏng hay mất sách, sẽ được hoàn lại 
cho bạn sau khi hoàn thành đơn.  <br/>
 -Đối với khách hàng chưa xác thực tài khoản phí cọc thuê sách sẽ là 80% giá sách. <br/>
 -Đối với khách hàng đã xác thực tài khoản phí cọc thuê sách sẽ là 60% giá sách. 
 <br/>
 <table style="border-collapse: collapse; width: 70%; border: 1px solid black;">
  <tr>
    <td style="padding-right: 40px; padding-left: 8px; border: 1px solid black;"><strong>Giá bìa sách</strong></td>
    <td style="padding-left: 8px;border: 1px solid black;"><strong>Giá thuê (theo ngày)</strong></td>
  </tr>
  <tr>
    <td style="padding-right: 40px; padding-left: 8px; border: 1px solid black;">Dưới 50.000đ</td>
    <td style="padding-left: 8px;border: 1px solid black;">1.000đ /1 cuốn /1 ngày</td>
  </tr>
  <tr>
    <td style="padding-right: 40px; padding-left: 8px; border: 1px solid black;">Từ 50.000đ - 100.000đ</td>
    <td style="padding-left: 8px;border: 1px solid black;">2.000đ /1 cuốn /1 ngày</td>
  </tr>
  <tr>
    <td style="padding-right: 40px; padding-left: 8px; border: 1px solid black;">Trên 100.000đ</td>
    <td style="padding-left: 8px;border: 1px solid black;">4.000đ /1 cuốn /1 ngày</td>
  </tr>
</table>

`;
const text2 = `

Phạt trễ hạn: <br/>
- Mức phạt: 5.000đ/ sách/ngày. <br/>
Nếu độc giả bị phạt tiền quá hạn từ 50.000đ trở lên, tài khoản sẽ bị khoá cho đến khi tài khoản được thanh toán đầy đủ.
<br/>

<table style="border-collapse: collapse; width: 70%; border: 1px solid black;">
  <tr>
    <td style="padding-left: 8px; border: 1px solid black;"><strong> Tình trạng </strong></td>
    <td style="padding-left: 8px;border: 1px solid black;"><strong> Mức phạt </strong></td>
  </tr>
  <tr>
    <td style="padding-left: 8px; border: 1px solid black;">Mất sách hoặc làm cho sách hoàn toàn không sử dụng được</td>
    <td style="padding-left: 8px;border: 1px solid black;"> Đền 100% giá trị sách </td>
  </tr>
  <tr>
    <td style="padding-left: 8px; border: 1px solid black;">  Mất trang </td>
    <td style="padding-left: 8px;border: 1px solid black;"> 10.000đ/tờ </td>
  </tr>
  <tr>
    <td style="padding-left: 8px; border: 1px solid black;">Làm bẩn, viết vẽ bẩn lên sách</td>
    <td style="padding-left: 8px;border: 1px solid black;"> 2.000đ/tờ </td>
  </tr>
  <tr>
    <td style="padding-left: 8px; border: 1px solid black;">Làm bong bìa</td>
    <td style="padding-left: 8px;border: 1px solid black;"> 15.000đ/1 cuốn</td>
  </tr>
  <tr>
    <td style="padding-left: 8px; border: 1px solid black;"> Làm rách sách</td>
    <td rowspan=3 style="padding-left: 8px;border: 1px solid black;">30.000đ/ sách </td>
  </tr>
  <tr>
    <td style="padding-left: 8px; border: 1px solid black;"> Làm ướt sách</td>
  </tr>
  <tr>
    <td style="padding-left: 8px; border: 1px solid black;"> Bóc nhãn, phiếu ghi chú trên sách</td>
  </tr>
</table> 


`;
const text3 = `Khi đã là bạn đọc tại Read Station, bạn có thể:<br/>
- Giữ sách và thưởng thức trọn vẹn nội dung trong thời gian tối đa là 14 ngày.<br/>
- Khi đã đọc xong và hoàn trả sách, bạn có thể mượn quyển sách tiếp theo.<br/>
- Theo quy định hiện tại, bạn có thể giữ tối đa cùng lúc là 3 quyển, và việc hoàn trả lại sách là yêu cầu bắt buộc để có thể mượn tiếp sách mới.<br/>
- Read Station mong bạn ưu tiên hoàn trả lại sách trong mọi trường hợp.<br/>
`;
</script>

<style scoped></style>