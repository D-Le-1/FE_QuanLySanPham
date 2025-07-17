let devices = [
  {
    id: 1,
    code: "EX001",
    image: [
      "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-13.jpg",
      "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    ],
    status: "available",
    category: "Máy xúc",
    model: "PC200-8",
    brand: "Komatsu",
    serial: "KMTPC200V12345678",
    year: 2020,
    price: 1200000000,
    title: "Máy xúc Komatsu PC200-8",
    description: "Toremote máy xúc Komatsu PC200-8, hiệu suất cao",
  },
  {
    id: 2,
    code: "BD002",
    image: [
      "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-13.jpg",
      "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    ],
    status: "sold",
    category: "Máy ủi",
    model: "D65EX-16",
    brand: "Komatsu",
    serial: "KMTBD065X98765432",
    year: 2019,
    price: 980000000,
    title: "Máy ủi Komatsu D65EX-16",
    description: "Toremote máy xúc Komatsu PC200-8, hiệu suất cao.",
  },
  {
    id: 3,
    code: "CR003",
    image: [
      "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-13.jpg",
      "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    ],
    status: "available",
    category: "Cần cẩu",
    model: "LTM 1100-4.2",
    brand: "Liebherr",
    serial: "LBRCR1100A45678901",
    year: 2021,
    price: 2500000000,
    title: "Cần cẩu Liebherr LTM 1100-4.2",
    description: "Toremote máy xúc Komatsu PC200-8, hiệu suất cao",
  },
  {
    id: 4,
    code: "RL004",
    image: [
      "https://cdn3.ivivu.com/2015/11/20-hinh-anh-tuyet-dep-ve-Viet-Nam-ivivu-13.jpg",
      "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    ],
    status: "maintenance",
    category: "Máy lu",
    model: "SD100D",
    brand: "Volvo",
    serial: "VLVSD100D23456789",
    year: 2022,
    price: 800000000,
    title: "Máy lu Volvo SD100D",
    description: "Toremote máy xúc Komatsu PC200-8, hiệu suất cao",
  },
];

let currentFilter = "";
let currentSearch = "";

function renderDevices() {
  const tableBody = document.getElementById("deviceTableBody");
  let filteredDevices = devices;

  // Apply filter
  if (currentFilter) {
    filteredDevices = filteredDevices.filter(
      (device) => device.status === currentFilter
    );
  }

  // Apply search
  if (currentSearch) {
    filteredDevices = filteredDevices.filter(
      (device) =>
        device.code.toLowerCase().includes(currentSearch.toLowerCase()) ||
        device.category.toLowerCase().includes(currentSearch.toLowerCase()) ||
        device.model.toLowerCase().includes(currentSearch.toLowerCase()) ||
        device.brand.toLowerCase().includes(currentSearch.toLowerCase()) ||
        device.serial.toLowerCase().includes(currentSearch.toLowerCase()) ||
        device.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
        device.description.toLowerCase().includes(currentSearch.toLowerCase())
    );
  }

  console.log(devices?.image);
  tableBody.innerHTML = "";

  filteredDevices.forEach((device, index) => {
    const statusConfig = {
      available: { text: "Có sẵn", class: "status-available" },
      sold: { text: "Đã bán", class: "status-sold" },
      maintenance: { text: "Bảo trì", class: "status-maintenance" },
    };

    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${device.code}</strong></td>
            <td>
              <span class="device-images d-flex position-relative">
                ${device.image
                  .map(
                    (img, index) => `
                    <img src="${img}" alt="${device.title}" 
                        style="width: 30px; height: 30px; border-radius: 50%; left: ${
                          index * 10
                        }px; z-index: ${index + 5};"
                        class="position-absolute" />
                  `
                  )
                  .join("")}
              </span>
            </td>
            <td>
                <span class="${statusConfig[device.status].class}">
                    ${statusConfig[device.status].text}
                </span>
            </td>
            <td>${device.category}</td>
            <td>${device.model}</td>
            <td>${device.brand}</td>
            <td>${device.serial}</td>
            <td>${device.year}</td>
            <td><strong>${formatPrice(device.price)}</strong></td>
            <td>${device.title}</td>
            <td>${device.description}</td>
            <td>
                <div class="action-buttons d-flex justify-content-center">
                    <button class="btn btn-sm" onclick="editDevice(${
                      device.id
                    })" title="Chỉnh sửa">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm" onclick="editDevice(${
                      device.id
                    })" title="Chỉnh sửa">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm" onclick="deleteDevice(${
                      device.id
                    })" title="Xóa">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
    tableBody.appendChild(row);
  });
}

document.querySelectorAll(".navbar-collapse .nav-link").forEach((link) => {
  link.addEventListener("click", function () {
    document
      .querySelectorAll(".navbar-collapse .nav-link")
      .forEach((l) => l.classList.remove("active"));
    this.classList.add("active");
  });
});

document.querySelectorAll(".nav-bottom .nav-link").forEach((link) => {
  link.addEventListener("click", function () {
    document
      .querySelectorAll(".nav-bottom .nav-link")
      .forEach((l) => l.classList.remove("active"));
    this.classList.add("active");
  });
});

document.querySelectorAll(".nav-link-2").forEach((link) => {
  link.addEventListener("click", function () {
    document
      .querySelectorAll(".nav-link-2")
      .forEach((l) => l.classList.remove("active"));
    this.classList.add("active");
  });
});

function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

function filterDevices(status) {
  currentFilter = status;
  renderDevices();
}

function searchDevices(query) {
  currentSearch = query;
  renderDevices();
}

function deleteDevice(id) {
  if (confirm("Bạn có chắc chắn muốn xóa thiết bị này?")) {
    devices = devices.filter((d) => d.id !== id);
    renderDevices();

    // Show success toast
    showToast("Xóa thiết bị thành công!", "success");
  }
}

function showSection(section) {
  showToast(`Chuyển đến mục: ${section}`, "info");
}

function showToast(message, type = "info") {
  // Create toast element
  const toastHtml = `
        <div class="toast align-items-center text-white bg-${type}" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;

  // Add toast container if it doesn't exist
  let toastContainer = document.getElementById("toastContainer");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toastContainer";
    toastContainer.className = "toast-container position-fixed top-0 end-0 p-3";
    toastContainer.style.zIndex = "9999";
    document.body.appendChild(toastContainer);
  }

  // Add toast to container
  toastContainer.insertAdjacentHTML("beforeend", toastHtml);

  // Show toast
  const toastElement = toastContainer.lastElementChild;
  new bootstrap.Toast(toastElement).show();

  // Remove toast after it's hidden
  toastElement.addEventListener("hidden.bs.toast", () => {
    toastElement.remove();
  });
}

// Initialize the page
renderDevices();
