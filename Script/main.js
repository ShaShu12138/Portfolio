// 引入GSAP和ScrollTrigger动画效果
gsap.registerPlugin(ScrollTrigger);

// 页面加载时将滚动位置设置为顶部
window.onload = function () {
	window.scrollTo(0, 0);
};

// 主视觉动画 - 网页加载时淡入标题和简介
gsap.from(".hero-content h2", {
	opacity: 0,
	y: -50,
	duration: 1.5,
	ease: "power2.out",
});

gsap.from(".hero-content p", {
	opacity: 0,
	y: 50,
	duration: 1.5,
	delay: 0.3,
	ease: "power2.out",
});

gsap.from(".hero-content hr", {
	opacity: 0,
	duration: 1.5,
	delay: 1,
	ease: "power2.out",
});

// ScrollTrigger配置 - 为每个主要的section设置滚动触发动画
const sections = document.querySelectorAll("section");

sections.forEach((section) => {
	gsap.from(section, {
		opacity: 0,
		y: 100,
		duration: 1,
		scrollTrigger: {
			trigger: section,
			start: "top 80%",
			toggleActions: "play none none none",
		},
	});
});

// 项目卡片动画 - 鼠标悬停时微微放大
const projectItems = document.querySelectorAll(".project-item");
projectItems.forEach((item) => {
	item.addEventListener("mouseenter", () => {
		gsap.to(item, { scale: 1.05, duration: 0.3 });
	});
	item.addEventListener("mouseleave", () => {
		gsap.to(item, { scale: 1, duration: 0.3 });
	});
});

// 技能栏动画 - 进入视图时填充进度条
ScrollTrigger.batch(".progress-bar", {
	start: "top 110%", // 触发点更低，使进度条更早填充
	onEnter: (elements) => {
		elements.forEach((el) => {
			const targetWidth = el.getAttribute("data-width");
			el.style.width = targetWidth; // 触发进度条填充到目标宽度
		});
	},
});
