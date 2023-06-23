package br.com.projetomaestro.model;
import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tb_pessoa")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Pessoa implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long idPessoa;
	
	@Column(nullable = false)
	private String nome;
	
	@Column(nullable = false)
	private Long cpf;
	
	@Column(nullable = false)
//	@Pattern(regexp = "[MF]", message = "O sexo deve ser M (masculino) ou F (feminino)")
	private Character sexo;
	
//	@ManyToOne
//	@JoinColumn(name = "familiaCodigo")
//	private Familia familia;
	
	@JsonIgnore
	@OneToOne(mappedBy = "pessoa")
	private Usuario usuario;
	
	@JsonIgnore
	@OneToOne(mappedBy = "pessoa")
	private Membro membro;
	
//	private LocalDate dataNascimento;
	private Long rg;
	private String email;
	private Integer ddd;
	private Long telefone;
	private String endereco;
	private Integer numEndereco;
	private String bairro;
	private String complemento;
	private String cidade;
	private String uf;
	private Long cep;
	
    public static boolean validarCpf(String cpf) {
        if (cpf.length() != 11) {
            return false;
        }

        int aux = cpf.charAt(0);
        boolean isEqual = true;

        for (int i = 1; i < cpf.length(); i++) {
            if (aux != cpf.charAt(i)) {
                isEqual = false;
                break;
            }
        }

        if (isEqual) {
            return false;
        }

        int peso = 10;
        int soma = 0;

        for (int i = 0; i < 9; i++) {
            soma += (cpf.charAt(i) - '0') * (peso);
            peso--;
        }

        soma = (soma * 10) % 11;
        int dig1 = (soma >= 10) ? 0 : soma;

        if (dig1 != cpf.charAt(9) - '0') {
            return false;
        }


        peso = 11;
        soma = 0;

        for (int i = 0; i < 10; i++) {
            soma += (cpf.charAt(i) - '0') * peso;
            peso--;
        }

        soma = (soma * 10) % 11;
        int dig2 = (soma >= 10) ? 0 : soma;

        if (dig2 != cpf.charAt(10) - '0') {
            return false;
        }

        return true;
    }
}
