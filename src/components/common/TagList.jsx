import React from "react";


const tags = [
  "Tất cả",
  "Lịch trình",
  "Thời gian",
  "Ngày tháng",
  "Cuối tuần",
  "Kế hoạch",
  "Giải trí",
  "Gặp gỡ",
  "Mua sắm",
  "Hỏi giá",
  "Mặc cả",
  "Giới thiệu",
  "Làm quen",
  "Trường học",
  "Cơ sở vật chất",
  "Nhà cửa",
  "Đồ đạc",
  "Vị trí",
  "Thức ăn",
  "Món ăn",
  "Ngày nghỉ",
  "Nguyện vọng",
  "Công việc",
  "Hằng ngày",
  "Hoạt động",
  "Đặt món",
  "Giao thông",
  "Sở thích",
  "Sinh nhật",
  "Hẹn gặp",
  "Quy tắc",
  "Giao tiếp",
  "Thư tín",
  "Bệnh viện",
  "Sức khoẻ",
  "Mua sắm nâng cao",
  "Điện thoại",
  "Giao tiếp nâng cao",
  "Đặt chỗ",
  "Phim ảnh",
  "Văn hóa Hallyu",
  "Du lịch",
  "Trải nghiệm",
  "Du lịch trải nghiệm",
  "Ngoại hình",
  "Miêu tả",
  "Chào hỏi",
];

const TagList = () => {
  return (
    <div className="position-relative mb-4">
      <div className="d-flex gap-2 overflow-auto pb-2">
        {tags.map((tag, index) => (
          <button
            key={tag}
            className={`btn btn-sm rounded-pill flex-shrink-0 ${
              index === 0
                ? "text-white"
                : "btn-outline-secondary bg-white text-secondary"
            }`}
            style={
              index === 0
                ? { backgroundColor: "rgb(95, 46, 234)", border: "none" }
                : {}
            }
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagList;
