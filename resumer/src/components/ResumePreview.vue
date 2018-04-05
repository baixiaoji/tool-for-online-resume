<template>
    <div id="resumePreview">
        <section data-name="profile" v-if="resume.profile && resume.profile.name">
        <h1 class="ture_name">
            {{resume.profile.name}}
        </h1>
        <h2 class="user_title">{{resume.profile.title}}</h2>
        <p>
            <small>{{resume.profile.city}}</small>
            <small>{{resume.profile.birthday}}</small>
        </p>
        </section>
        <section data-name='projects' v-if="resume.projects && resume.projects.length > 0">
            <h2>项目经历</h2>
            <ol>
                <li v-for="item in resume.projects">
                    <h3>{{ item.name }}</h3>
                    <p v-show="item.details">{{item.details}}</p>
                </li>
            </ol>
        </section>
        <section data-name="workHistory" v-if="resume.workHistory && resume.workHistory.length > 0">
        <h2>工作经历</h2>
        <ol>
            <li v-for="item in resume.workHistory">
            <h3>{{item.company}}</h3>
            <p v-show="item.details"> {{item.details}} </p>
            </li>
        </ol>
        </section>

        <section data-name="education" v-if="resume.education && resume.education.length > 0">
        <h2>毕业院校</h2>
        <ol>
            <li v-for="item in resume.education">
            <h3>{{item.school}}
                <span v-show="item.details"> - {{item.details}} </span>
            </h3>
            </li>
        </ol>
        </section>
        <section data-name='awards' v-if="resume.awards && resume.awards.length > 0">
            <h2>获奖情况</h2>
            <ol>
                <li v-for="item in resume.awards">
                    <h3>{{ item.name }}</h3>
                    <p v-show="item.details">{{item.details}}</p>
                </li>
            </ol>
        </section>
        <section data-name='contacts' v-if="resume.contacts && resume.contacts.length > 0">
            <h2>联系方式</h2>
            <table>
                <tr v-for="item in resume.contacts">
                    <td>{{ item.contact}}</td>
                    <td v-show="item.content">{{ item.content}}</td>
                </tr>
            </table>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'ResumePreview',
        computed: {
            resume() {
                return this.$store.state.resume
            }
        }
    }
</script>
<style lang="less" src="../assets/preview.less"></style>